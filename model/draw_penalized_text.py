import cv2
from extract_license_plate import penalized_texts


def draw_penalized_text(frame):
    # Set font, scale, thickness, and color
    font = cv2.FONT_HERSHEY_TRIPLEX
    font_scale = 1  
    font_thickness = 2
    color = (255, 255, 255)  # White color
    
    # Initial position for Y-coordinate
    y_pos = 180
    
    # Put title on the frame
    cv2.putText(frame, 'Fined license plates:', (25, y_pos), font, font_scale, color, font_thickness)
    
    # Update Y-coordinate position
    y_pos += 80
    # penalized_texts = []
    # Loop through all fined license plates
    for text in penalized_texts:
        # Add fined license plate text on the frame
        cv2.putText(frame, '->  '+text, (40, y_pos), font, font_scale, color, font_thickness)
        
        # Update Y-coordinate for next license plate
        y_pos += 60