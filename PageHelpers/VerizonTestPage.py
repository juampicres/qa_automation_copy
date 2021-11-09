import pyautogui


def click_free_consultation_button(x_coordinate, y_coordinate):
    """Function to click on page element, when hard to use id or xpath
    Args:
        x_coordinate (integer):
        y_coordinate (integer):
    """
    pyautogui.click(x_coordinate, y_coordinate)  # move to x, y then click the mouse
