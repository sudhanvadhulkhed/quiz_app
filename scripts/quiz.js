class Quiz{
    constructor() {
        this.URL="https://opentdb.com/api.php";
        this.catURL="https://opentdb.com/api_category.php";
    }    

    async getCat() {
        let data;
        const response = await fetch(this.catURL);
        if( response.status === 200)
            data = await response.json();
        else 
            throw new Error("error fetching data");
        return data.trivia_categories;
    }

    async getQuiz(amount, category) {
        console.log(amount);
        let query = `${this.URL}?amount=${amount}`;
        if(category !== "any")
            query+=`&category=${category}`;
        let data;
        const response = await fetch(query);
        if( response.status === 200)
            data = await response.json();
        else
            throw new Error("error fetching data");
        return data;
    }
}
