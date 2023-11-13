# inventory-management
#### Video Demo:  https://www.youtube.com/watch?v=Zm0qIuZClDM


#### Background:

In 2019 a family member with a small business approached me with a problem.  They sold showers, vanities, and a few other things. The problem was they didn’t have a good way to keep track inventory. They were fine when they only had one warehouse that was physically located in the show room store. However, the business was growing and they now had an out of store warehouse with plans in the future to potentially have additional warehouses.

At the time I was a software engineer at an e-commerce company so they asked me if I knew of a product that could do that, something preferably free or low cost. I did some research on off the shelf products and custom solutions but didn’t find anything within their budget.

#### Solution:

I found AppSheet, https://about.appsheet.com/, or low code solution that let you build mobile apps that interact with google sheets. Today, as compared to 2019, AppSheet is much more advanced, and I built some custom scripts on Google SpreadSheets that you can see on the github page;https://github.com/michael-szyszko/inventory-management/blob/main/inventory.gs I’ll link below. The big benefit of the custom code I wrote is that the owner was able to do things from the both spreadsheet ui and mobile application.

The script makes the SpreadSheets behave like a transactional database, when a user does any stocking, such as adding or removing items, it creates a stocking line item, that then transactionally updates a master inventory table that can be easily referenced from the Google Spreadsheet UI or from the AppSheet App There are a few other things the script does such as send e-mail alerts based on certain stocking levels


#### Features:
1. Adding and removing stock quantities. Mobile app that employees could install on  personal devices. Usable admin UI that they can access as a web application on a desktop or laptop.
2. Keeping track of how much and where stock is,and being able to add new locations and potentially more granular locations. For example would be useful to see at a glance how full warehouses are.
3. History of stocking actions, i.e., when, who and how many items were added or removed.
4. Remove products if they are discontinued or not expected to be back in stock for long periods of time. But would like the ability to see history of that item and potentially re-activate. 
5. Search items by different methods such as name, product sku, location, category, etc.
6. Have the ability to create new locations or more granular stocking locations.
