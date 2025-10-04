# Objective

Create a React frontend and use the provided API. The frontend must implement the features below.

## Page header

- Show the text "Ab Yritys Oy" aligned to the left of the header section.

## Landing page

- A form input for "Customer Number".
- A "Continue" button.
- Show an error message if the customer number does not result in anything.

## Order page

### Header

- Show the text "Total: X XXX,XX €" — the formatted total sum of the selected products using a space as the thousand separator and a comma as the decimal separator.
- An "Order" button on the right side of the section.
- The "Order" button must be disabled if the order status is "ordered".

### Product listing

- Show 6 selectable product cards per page.
- Each card must contain: image, name, description, rating (stars X out of 5), price (format: "XX,XX €"), and a ✓ check mark indicating selection.
- In the top-right corner of the image, show:
  - If a product has an index divisible by 3: 👍 (thumbs up).
  - If a product has an index divisible by 5: 💖 (sparkling heart).
  - If a product has an index divisible by 3 and 5: 😍 (heart eyes).
  - Else show a number (index + 1), for example "#1" for the first card.

### Pagination

- Buttons: "Previous" and "Next".
- A text indicating the total amount of products and pages: "XX products, page X out of Y".

### Submission feedback

- Show an error message if placing the order fails.
- Show a success message if placing the order succeeds.

### Order status and restrictions

- Show the order status ("not ordered" or "ordered") and the selected products in the same view.
- If the order status is "ordered", the customer cannot change the selected products or place a new order.