import cv2
import numpy as np
from collections import deque
# from download import license_plate_cascade

import requests
import cv2
# Download the trained Haar Cascade from the GitHub repository
url = "https://raw.githubusercontent.com/FarzadNekouee/Traffic-Violation-Detection/master/haarcascade_russian_plate_number.xml"
response = requests.get(url)

with open('haarcascade_russian_plate_number.xml', 'wb') as file:
    file.write(response.content)

# Load the trained Haar Cascade
license_plate_cascade = cv2.CascadeClassifier('haarcascade_russian_plate_number.xml')

# Create a list to store unique penalized license plate texts
penalized_texts = []

def extract_license_plate(frame, mask_line):    
    # Convert the image to grayscale (Haar cascades are typically trained on grayscale images)
    gray = cv2.cvtColor(mask_line, cv2.COLOR_BGR2GRAY)
    
    # Apply CLAHE to equalize the histogram
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
    gray = clahe.apply(gray)
    
    # Erode the image using a 2x2 kernel to remove noise
    kernel = np.ones((2, 2), np.uint8)
    gray = cv2.erode(gray, kernel, iterations=1)

    # Find the bounding box of non-black pixels
    non_black_points = cv2.findNonZero(gray)
    x, y, w, h = cv2.boundingRect(non_black_points)

    # Calculate the new width of the bounding box, excluding 30% on the right side
    w = int(w * 0.7)

    # Crop the image to the bounding box
    cropped_gray = gray[y:y+h, x:x+w]

    # Detect license plates in the image (this returns a list of rectangles)
    license_plates = license_plate_cascade.detectMultiScale(cropped_gray, scaleFactor=1.07, minNeighbors=15, minSize=(20, 20))

    # List to hold cropped license plate images
    license_plate_images = []

    # Loop over the license plates
    for (x_plate, y_plate, w_plate, h_plate) in license_plates:
        # Draw a rectangle around the license plate in the original frame (here you need the original coordinates)
        cv2.rectangle(frame, (x_plate + x, y_plate + y), (x_plate + x + w_plate, y_plate + y + h_plate), (0, 255, 0), 3)
    
        # Crop the license plate and append it to the list (here x_plate and y_plate are relative to cropped_gray)
        license_plate_image = cropped_gray[y_plate:y_plate+h_plate, x_plate:x_plate+w_plate]
        license_plate_images.append(license_plate_image)

    return frame, license_plate_images