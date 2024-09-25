
# import sys
# import joblib
# import numpy as np

# # Load the model
# # model = joblib.load('../model/wait_time_predictor.pkl')
# model_path = '/Users/abhishekkumar/Desktop/btp_project2/backend/model/wait_time_predictor.pkl'
# # model_path = '/Users/abhishekkumar/Desktop/btp project - 1/backend/model/wait_time_predictor.pkl'
# model = joblib.load(model_path)


# # Check if the required number of arguments is provided
# if len(sys.argv) != 4:
#     print("Error: Expected 3 arguments: <arrival_time> <department> <doctors_available>")
#     sys.exit(1)

# # Get features from command-line arguments
# try:
#     arrival_time = float(sys.argv[1])  # Adjust as necessary for your features
#     department = int(sys.argv[2])       # Adjust as necessary for your features
#     doctors_available = int(sys.argv[3]) # Adjust as necessary for your features
# except ValueError as e:
#     print("Error: Invalid argument type. Ensure <arrival_time> is a float and <department> and <doctors_available> are integers.")
#     sys.exit(1)

# # Create the features array
# features_array = np.array([[arrival_time, department, doctors_available]])

# # Make the prediction
# prediction = model.predict(features_array)
# print("Predicted wait time:", prediction[0])  # Adjusted to print the first predicted value
# print("Hello from Python!")
import warnings
warnings.filterwarnings("ignore", category=UserWarning)


import sys
import joblib
import numpy as np

# Load the model from the specified path
model_path = '/Users/abhishekkumar/Desktop/btp_project2/backend/model/wait_time_predictor.pkl'
model = joblib.load(model_path)

# Check if the required number of arguments is provided
if len(sys.argv) != 4:
    print("Error: Expected 3 arguments: <arrival_time> <department> <doctors_available>")
    sys.exit(1)

# Get features from command-line arguments
try:
    arrival_time = float(sys.argv[1])  # Expecting a float
    department = int(sys.argv[2])       # Expecting an integer
    doctors_available = int(sys.argv[3]) # Expecting an integer
except ValueError as e:
    print("Error: Invalid argument type. Ensure <arrival_time> is a float and <department> and <doctors_available> are integers.")
    sys.exit(1)

# Create the features array in the correct shape for the model
features_array = np.array([[arrival_time, department, doctors_available]])

# Make the prediction
prediction = model.predict(features_array)

# Print the predicted wait time
print("Predicted wait time:", prediction[0])  # Outputs the first predicted value
