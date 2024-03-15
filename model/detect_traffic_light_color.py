import cv2 
import numpy as np


def detect_traffic_light_color(image, rect):
    # Extract rectangle dimensions
    x, y, w, h = rect
    # Extract region of interest (ROI) from the image based on the rectangle
    roi = image[y:y+h, x:x+w]
    
    # Convert ROI to HSV color space
    hsv = cv2.cvtColor(roi, cv2.COLOR_BGR2HSV)

    # Define HSV range for red color
    red_lower = np.array([0, 120, 70])
    red_upper = np.array([10, 255, 255])
    
    # Define HSV range for yellow color
    yellow_lower = np.array([20, 100, 100])
    yellow_upper = np.array([30, 255, 255])

    # Create binary masks for detecting red and yellow in the ROI
    red_mask = cv2.inRange(hsv, red_lower, red_upper)
    yellow_mask = cv2.inRange(hsv, yellow_lower, yellow_upper)
    
    # Font details for overlaying text on the image
    font = cv2.FONT_HERSHEY_TRIPLEX
    font_scale = 1  
    font_thickness = 2  
    
    # Check which color is present based on the masks
    if cv2.countNonZero(red_mask) > 0:
        text_color = (0, 0, 255)
        message = "Detected Signal Status: Stop"
        color = 'red'
    elif cv2.countNonZero(yellow_mask) > 0:
        text_color = (0, 255, 255)
        message = "Detected Signal Status: Caution"
        color = 'yellow'
    else:
        text_color = (0, 255, 0)
        message = "Detected Signal Status: Go"
        color = 'green'
        
    # Overlay the detected traffic light status on the main image
    cv2.putText(image, message, (15, 70), font, font_scale+0.5, text_color, font_thickness+1, cv2.LINE_AA)
    # Add a separator line
    cv2.putText(image, 34*'-', (10, 115), font, font_scale, (255,255,255), font_thickness, cv2.LINE_AA)
    
    # Return the modified image and detected color
    return image, color