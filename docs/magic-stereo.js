document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#parameters-form").onsubmit() = () => {
        let spotifyID = document.querySelector("#song-id").value;
        let numberOfSongs = document.querySelector("#numb-of-songs").value;
        document.querySelector("#song-id").innerHTML = "";

        fetch(`https://api.reccobeats.com/v1/track/recommendation?size=${numberOfSongs}&seeds=${spotifyID}`)
        .then(response => response.json())
        .then()
    }
})