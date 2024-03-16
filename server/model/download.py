
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
# %%
