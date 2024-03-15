import streamlit as st
import os
import tempfile
import cv2
import numpy as np
# import traffic-detection as tf
# command to run the streamlit app is streamlit run model/streamlit.py
# Load your machine learning model here
# Example:
# model = load_model('your_model.h5')

# Function to process video frames
def process_frame(frame):
    # Example: perform some processing using your machine learning model
    # processed_frame = model.predict(frame)
    processed_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)  # Example: Convert frame to grayscale
    return processed_frame

# Main function
def main():
    st.title("Upload Video to Server and Process with ML Model")

    # File uploader
    uploaded_file = st.file_uploader("Choose a video file", type=["mp4"])

    # If a file is uploaded
    if uploaded_file is not None:
        st.write("Uploading file...")
        
        # Save the uploaded file to a temporary location on the server
        with st.spinner('Saving uploaded file...'):
            temp_file_path = os.path.join(tempfile.gettempdir(), uploaded_file.name)
            with open(temp_file_path, "wb") as f:
                f.write(uploaded_file.read())

        st.success('File successfully saved on the server!')

        # Display path to the saved file
        st.write(f"File saved at: {temp_file_path}")
        print(temp_file_path)

        # initalize tf main() by passing the temp_file_path 
        # app = tf.TrafficApp(process_frame, temp_file_path)

        # if _name_ == '__main':
        #     app.run()

        # Process video with ML model
        st.write("Processing video with ML model...")

        cap = cv2.VideoCapture(temp_file_path)
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
            processed_frame = process_frame(frame)
            # Pass the processed frame to your ML model for further processing or analysis
            # Example: model.predict(processed_frame)

        cap.release()




if __name__ == '__main__':
    main()