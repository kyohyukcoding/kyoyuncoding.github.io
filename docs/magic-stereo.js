document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#parameters-form").onsubmit = () => {
        let spotifyURI = document.querySelector("#song-id").value;
        let numberOfSongs = document.querySelector("#numb-of-songs").value;
        let table = document.querySelector("#song-recommendations");
        document.querySelector("#song-id").value = "";
        document.querySelector("#numb-of-songs").value = "";
                
        fetch(`https://api.reccobeats.com/v1/track/recommendation?size=${numberOfSongs}&seeds=${spotifyURI}`)
        .then(response => response.json())
        .then(data => {
            // Add all the artists that are on the track as well.
            data["content"].forEach(title => {

                let tr = document.createElement('tr');

                let tdArtist = document.createElement('td');
                tdArtist.textContent = title["artists"][0]["name"];

                let tdTrackTitle = document.createElement('td');
                tdTrackTitle.textContent = title["trackTitle"];
                
                let tdSongLink = document.createElement('td');
                let songLink = document.createElement('a');
                songLink.href = title["href"];
                songLink.textContent = "Link";
                tdSongLink.appendChild(songLink);

                tr.appendChild(tdArtist);
                tr.appendChild(tdTrackTitle);
                tr.appendChild(tdSongLink);

                table.appendChild(tr);
            });

            document.querySelector("#song-recommendations").style.visibility = "visible";
        });
        return false;
    }
})