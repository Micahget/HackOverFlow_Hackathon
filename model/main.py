import cv2
import re
import requests
import numpy as np
import matplotlib.pyplot as plt
import easyocr
from mysql.connector import Error
from PIL import Image
from extract_license_plate import  extract_license_plate, penalized_texts
from detect_traffic_light_color import detect_traffic_light_color
from create_database_and_table import create_database_and_table
from update_database_with_violation import update_database_with_violation
from clear_license_plates import clear_license_plates
from draw_penalized_text import draw_penalized_text
from print_all_violations import print_all_violations
from LineDetector import LineDetector
from apply_ocr_to_image import apply_ocr_to_image

import pytesseract

# Set the path to Tesseract executable
pytesseract.pytesseract.tesseract_cmd = r'C:\Users\mikiy\.conda\envs\traffic-vio-notebook\Library\bin\tesseract.exe'


# Define global variables
DB_HOST = 'localhost'
DB_USER = 'root'
DB_PASSWORD = ''
DB_NAME = 'traffic_violations_db'
URL_HAARCASCADE = "https://raw.githubusercontent.com/FarzadNekouee/Traffic-Violation-Detection/master/haarcascade_russian_plate_number.xml"
VIDEO_PATH = './traffic_video_modified.mp4'


def download_haarcascade(url, filename='haarcascade_russian_plate_number.xml'):
    """Download Haar Cascade XML file from URL."""
    response = requests.get(url)
    with open(filename, 'wb') as file:
        file.write(response.content)


def process_frame(frame, detector, license_plate_cascade):
    """Process a single frame."""
    # Assuming rect is the rectangle where the traffic light is located
    rect = (1700, 40, 100, 250)

    # Detect traffic light color
    frame, color = detect_traffic_light_color(frame, rect)

    # Detect white line
    frame, mask_line = detector.detect_white_line(frame, color)

    if color == 'red':
        # Extract license plate
        frame, license_plate_images = extract_license_plate(frame, mask_line)

        # Process each detected license plate
        for license_plate_image in license_plate_images:
            # # Apply OCR to the license plate image
            # text = apply_ocr_to_image(license_plate_image) # instead of using pytesseract I can use another OCR library like easyocr
            # The implementation of easyocr is as follows:
            reader = easyocr.Reader(['en'], gpu=True) # here i want to use gpu for faster processing  # I can also use the cpu by setting gpu to False. To 
            result = reader.readtext(license_plate_image)
            text = result[0][-2]
            # Check if the text is a valid license plate and not already penalized
            

            pattern = r"^[A-Z]{2}\s[0-9]{3,4}$"
            if text is not None and re.match(pattern, text) and text not in penalized_texts:
                penalized_texts.append(text)
                print(f"\nFined license plate: {text}")

                # # Plot the license plate image
                # plt.figure()
                # plt.imshow(license_plate_image, cmap='gray')
                # plt.axis('off')
                # plt.show()

                # Update the database with the license plate violation
                update_database_with_violation(text, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)


def main():
    # Download Haar Cascade XML file
    download_haarcascade(URL_HAARCASCADE)

    # Load the trained Haar Cascade
    license_plate_cascade = cv2.CascadeClassifier('haarcascade_russian_plate_number.xml')

    # Create a list to store unique penalized license plate texts
    penalized_texts = []

    # Ensure the database and table exist
    create_database_and_table(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)

    # Clear the license plates from the previous run. (Comment out this line if desired!)
    clear_license_plates(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)

    # Open the video file
    vid = cv2.VideoCapture(VIDEO_PATH)

    # Create detector object
    detector = LineDetector()

    # Loop through each frame in the video
    while True:
        # Read frame
        ret, frame = vid.read()

        # Break if frame is not returned
        if not ret:
            break

        process_frame(frame, detector, license_plate_cascade)

        # Draw the penalized text onto the frame if there is any
        if penalized_texts:
            draw_penalized_text(frame)

        # Display the frame
        cv2.imshow('frame', frame)

        # Break if ESC key is pressed
        if cv2.waitKey(1) == 27:
            break

    # Release the video
    vid.release()

    # Close all OpenCV windows
    cv2.destroyAllWindows()

    # Print all the violations from the database
    print_all_violations(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)


# Run the main function
if __name__ == "__main__":
    main()
