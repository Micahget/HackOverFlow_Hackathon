# import torch and check if cuda is available
import torch

# check if cuda is available
cuda = torch.cuda.is_available()
print(cuda)