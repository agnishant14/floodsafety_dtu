# from PIL import Image
# import numpy as np
# import json

# # Load the segmented image (replace 'path/to/your/image.png' with the actual path)
# image_path = 'mask.png'
# image = Image.open(image_path)

# # Convert the image to a NumPy array
# image_array = np.array(image)

# # Get the shape of the image array
# height, width = image_array.shape

# # Center coordinates
# center_lat, center_lon = 26.1931, 92.5418

# # Image size and side length
# image_size = 999
# side_length_km = 10

# # Conversion factors
# lat_degree_to_km = 111.32  # Approximate at most latitudes
# lon_degree_to_km = 111.32  # Approximate at the equator

# # Calculate the distance covered by one pixel in degrees
# pixel_distance_lat = side_length_km / image_size / lat_degree_to_km
# pixel_distance_lon = side_length_km / image_size / lon_degree_to_km

# water_coordinates = []

# top_left_lat = center_lat + ( 5 / lat_degree_to_km)
# top_left_lon = center_lon - (5 / lon_degree_to_km) 

# # Loop through each pixel and calculate latitude and longitude
# for row in range(image_size):
#     for col in range(image_size):
#         if image_array[row, col] == 255:
#             lat = top_left_lat + (row * pixel_distance_lat)
#             lon = top_left_lon + (col * pixel_distance_lon)
#             water_coordinates.append({'latitude': lat, 'longitude': lon})

            
# output_json_path = 'water_coordinates.json'
# with open(output_json_path, 'w') as json_file:
#     json.dump(water_coordinates, json_file, indent=2)

# print(f'Water coordinates saved to {output_json_path}')

from PIL import Image
import numpy as np
import json

# Load the segmented image (replace 'path/to/your/image.png' with the actual path)
image_path = 'test.png'
image = Image.open(image_path)

# Convert the image to a NumPy array
image_array = np.array(image)

# Get the shape of the image array
height, width = image_array.shape

# Center coordinates
center_lat, center_lon = 26.1931, 92.5418

# Image size and side length
image_size = 999
side_length_km = 10

# Conversion factors
lat_degree_to_km = 111.32  # Approximate at most latitudes
lon_degree_to_km = 111.32  # Approximate at the equator

# Calculate the distance covered by one pixel in degrees
pixel_distance_lat = side_length_km / image_size / lat_degree_to_km
pixel_distance_lon = side_length_km / image_size / lon_degree_to_km

# Group neighboring pixels
group_size = 10  # Increase this value to group more pixels together

water_coordinates = []

top_left_lat = center_lat + (5 / lat_degree_to_km)
top_left_lon = center_lon - (5 / lon_degree_to_km)
print(top_left_lat, top_left_lon)

top_right_lat = center_lat + (5 / lat_degree_to_km)
top_right_lon = center_lon + (5 / lon_degree_to_km)
print(top_right_lat, top_right_lon)

buttom_left_lat = center_lat - (5 / lat_degree_to_km)
buttom_left_lon = center_lon - (5 / lon_degree_to_km)
print(buttom_left_lat, buttom_left_lon)

button_right_lat = center_lat - (5 / lat_degree_to_km)
button_right_lon = center_lon + (5 / lon_degree_to_km)
print(button_right_lat, button_right_lon)



# Loop through each pixel with a step determined by the group size
for row in range(0, image_size, group_size):
    for col in range(0, image_size, group_size):
        # Check if any pixel in the group is water (pixel value is 255)
        if np.any(image_array[row:row+group_size, col:col+group_size] == 255):
            lat = top_left_lat + (row * pixel_distance_lat)
            lon = top_left_lon + (col * pixel_distance_lon)
            water_coordinates.append({'latitude': lat, 'longitude': lon})

output_json_path = 'optimized_water_coordinates.json'
with open(output_json_path, 'w') as json_file:
    json.dump(water_coordinates, json_file, indent=2)

print(f'Water coordinates saved to {output_json_path}')
