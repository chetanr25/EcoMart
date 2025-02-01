# Ecomart: Eco-Friendly Product Finder Chrome Extension
We are team Greenfinch , we are building a product for hackathon. Our product name is Ecomart! 

Our plan is to build a chrome extension. When a user searches a product (for ex: amazon) , then when he clicks on one particular product, the extension pops up and the extension extracts the product details and passes them to the Gemini API. The API returns information about the environmental impact of the product, including metrics like carbon footprint, manufacturing harm, and sustainable material usage.

In addition to environmental insights, Ecomart helps users discover eco-friendly alternatives by displaying a button that directs them to products from certified, eco-friendly brands registered with Ecomart. The extension links users directly to these alternative products, and Greenfinch earns a commission based on clicks and purchases.

# Usage
**Install the Extension:** Add the Ecomart Chrome extension to your browser from the Chrome Web Store.

**Search for a Product:** Go to any e-commerce website like Amazon, search for a product, and click on one of the products you're interested in.

**View Environmental Impact:** When you click on a product, Ecomart's extension will pop up and display detailed insights about the product’s environmental impact (e.g., carbon footprint, manufacturing harm, sustainability percentage).

**Find Eco-Friendly Alternatives:** Below the product information, you'll see a button that says "Find Eco-Friendly Alternative". Clicking it will show you a list of eco-friendly products from brands registered with Ecomart.

**Make a Sustainable Choice:** Click on any of the eco-friendly alternatives to view their product details and make your purchase directly through the product link. Ecomart earns a commission for the referral.

# Features
**Chrome Extension** – Automatically pops up when a user clicks on a product on e-commerce websites like Amazon, displaying detailed sustainability information and eco-friendly alternatives.

**Sustainability Overview** – Displays comprehensive environmental impact data, including carbon footprint, water usage, recyclability, and eco-certifications, helping users make informed, eco-conscious choices.

**Eco-friendly Alternatives** – Provides a button to find and suggest eco-friendly alternatives, redirecting users to registered brands that offer more sustainable products.

**Brand Registration Portal** – Allows eco-friendly brands to register their products, offering a platform for sustainable companies to showcase their environmentally conscious products.

**Admin Approval Workflow** – Ensures that products registered by brands undergo a review and approval process to verify their sustainability claims and eco-certifications before being listed in the system.

# Tech Stack
**Frontend:**

**Next.js:** Framework for building the Chrome extension frontend. Handles rendering the popup and managing the UI.
**JavaScript:** The main programming language for the extension's logic and interaction.
**Firebase:** Used for storing registered users in Collection 1 and approved eco-friendly companies in Collection 2.

**Backend:**

**Gemini API:** Used to fetch detailed environmental impact data of products when clicked by the user.
**Firebase:** Used for managing data and user interactions for registration and approval processes.