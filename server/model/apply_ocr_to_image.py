import cv2
import pytesseract
from PIL import Image

def apply_ocr_to_image(license_plate_image):    
    # Threshold the image
    _, img = cv2.threshold(license_plate_image, 120, 255, cv2.THRESH_BINARY)

    # Convert OpenCV image format to PIL Image format for pytesseract
    pil_img = Image.fromarray(img)

    # Use pytesseract to extract text from the image
    full_text = pytesseract.image_to_string(pil_img, config='--psm 6' '--oem 3')

    return full_text.strip()  # Removing any extra white spaces from the ends