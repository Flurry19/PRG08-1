**Your own chatbot for your webshop who makes customer service a lot easier for small businesses!**

This chatbot is specifically made for the webshop www.nerdyglazen.com, but by changing the prompt you can make it so it suits the need of your webshop!

**Getting Started**
Clone this repository and download it locally.
First do npm install.
Next you add a .env file to your project and add your OpenAI API key and other information to it.
OPENAI_API_TYPE=//your open ai type//
OPENAI_API_VERSION=//your open ai version//
OPENAI_API_BASE=//your open ai base//
AZURE_OPENAI_API_KEY=//your open ai key//
DEPLOYMENT_NAME=//your open ai deployment name//
ENGINE_NAME=//your open ai engine name//
INSTANCE_NAME=//your open instance name//
EXPRESS_PORT=8000

Make sure that if you want your chatbot to be pushed to github you also make a .gitignore file and place .env in it so that other people can't get to your api key.
To start your bot you need to perform the command on the server side: npm run dev.

Change the constant engineeredQuestion to what you want the bot to be and do.

Run the index.html with your browser to see the bot! Ask the bot something and see the result!
