function submitQuiz() {
    const form = document.getElementById("quizForm");
    const resultContainer = document.getElementById("result");

    const answers = {
        q1: form.elements.q1.value,
        q2: form.elements.q2.value,
        q3: form.elements.q3.value,
        q4: form.elements.q4.value,
        q5: form.elements.q5.value,
        q6: form.elements.q6.value,
        q7: form.elements.q7.value,
        q8: form.elements.q8.value,
        q9: form.elements.q9.value,
        q10: form.elements.q10.value
        // Ajoutez d'autres questions et réponses au besoin
    };

    const correctAnswers = {
        q1: "c",
        q2: "a",
        q3: "a",
        q4: "b",
        q5: "b",
        q6: "b",
        q7: "a",
        q8: "b",
        q9: "b",
        q10: "b"
        // Ajoutez les réponses correctes pour les autres questions
    };

    let score = 0;

    for (const question in answers) {
        if (answers.hasOwnProperty(question)) {
            if (answers[question] === correctAnswers[question]) {
                score++;
            }
        }
    }

    resultContainer.innerHTML = `Votre score : ${score} / ${Object.keys(answers).length}`;

    // Vous pouvez ajouter d'autres actions après la soumission du quizz
}
