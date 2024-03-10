document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('questionForm');
    const loadDataButton = document.getElementById('loadDataButton');
    const input = document.getElementById('textInput');
    const loader = document.getElementById('loader');
    // localStorage.getItem("myChatHistory");
    loadDataButton.addEventListener('click', async function () {
        const askedQuestion = input.value.trim();
        if (!askedQuestion) {
            return;
        }

        addMessage(askedQuestion);
        input.value = "";
        loadDataButton.disabled = true;
        loadDataButton.classList.add('opacity-50')
        loader.classList.remove('hidden')
        try {
            const response = await fetch("http://localhost:8000/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({question: askedQuestion})
            });
            if (!response.ok) {
                throw new Error('Failed to get response');
            }
            const responseData = await response.json();
            const airesponse = responseData.answer;
            addMessage(false, airesponse)
            await timeOfMessage();
        } catch (error) {
            console.error("Error:", error)
            addMessage(false, "an error occured")
            loadDataButton.disabled = false
            loadDataButton.classList.remove('opacity-50')
            loader.classList.add('hidden')

        } finally {
            loadDataButton.disabled = false
            loadDataButton.classList.remove('opacity-50')
            loader.classList.add('hidden')
        }
    });

    async function timeOfMessage() {
        try {
            const timeResponse = await fetch("http://worldtimeapi.org/api/ip");
            const timeData = await timeResponse.json();
            const currentTime = new Date(timeData.utc_datetime);
            const time = currentTime.toLocaleTimeString();
            const timeDiv = document.createElement("div");
            timeDiv.textContent = time;
            form.appendChild(timeDiv);
        } catch (error) {
            console.error("Error fetching time:", error);
        }
    }

    function addMessage(isUser, message) {
        const questionDiv = document.createElement("div");
        questionDiv.className = isUser ? "message user" : "message ai";
        const input = document.getElementById('textInput');
        const askedQuestion = input.value.trim();
        questionDiv.classList.add('w-5/12', 'float-right', 'bg-gray-300', 'rounded-lg', 'mt-2');
        questionDiv.textContent = askedQuestion;
        form.appendChild(questionDiv);


        const answerDiv = document.createElement("div");
        answerDiv.classList.add('w-5/12', 'text-left', 'mt-6', 'bg-blue-400', 'rounded-lg');

        if (isUser) {
            answerDiv.classList.add('message', 'user');
        } else {
            answerDiv.classList.add('message', 'ai');
        }
        answerDiv.textContent = message;
        form.appendChild(answerDiv);
    }
})