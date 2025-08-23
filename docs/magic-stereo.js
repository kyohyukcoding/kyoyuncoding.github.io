document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#parameters-form").onsubmit = () => {
        let table = document.querySelector("#song-recommendations");
        table.innerHTML = "";  
        let spotifyURI = document.querySelector("#song-id").value.substring(31, 53);
        document.querySelector("#song-id").value = "";

        let acousticnessValue = document.querySelector("#acousticness-value").textContent;
        let danceabilityValue = document.querySelector("#danceability-value").textContent;
        let energyValue = document.querySelector("#energy-value").textContent;
        let instrumentalnessValue = document.querySelector("#instrumentalness-value").textContent;
        let popularityValue = document.querySelector("#popularity-value").textContent * 100;
                
        fetch(`https://api.reccobeats.com/v1/track/recommendation?size=10&seeds=${spotifyURI}&acousticness=${acousticnessValue}&danceability=${danceabilityValue}&energy=${energyValue}&instrumentalness=${instrumentalnessValue}&popularity=${popularityValue}`)
        .then(response => response.json())
        .then(data => {
            if (data["content"] !== undefined)
            {
                let trHeaderRow = document.createElement('tr');
                let thTitleHeader = document.createElement('th');
                thTitleHeader.textContent = "Track Recommendations Table";
                thTitleHeader.colSpan = 3;
                trHeaderRow.append(thTitleHeader);
                table.append(trHeaderRow);

                let trColumnNames = document.createElement('tr');
                let thColumnNameArtist = document.createElement('th');
                let thColumnNameSongTitle = document.createElement('th');
                let thColumnNameSongLink = document.createElement('th');

                thColumnNameArtist.textContent = "Artist(s)";
                thColumnNameSongTitle.textContent = "Track Title"
                thColumnNameSongLink.textContent = "Link"

                trColumnNames.append(thColumnNameArtist);
                trColumnNames.append(thColumnNameSongTitle);
                trColumnNames.append(thColumnNameSongLink);
                table.append(trColumnNames);

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
                document.querySelector("#error-messages").style.display = "none";
                document.querySelector("#song-recommendations").style.display = "";
            }
            else
            {
                document.querySelector("#error-messages").textContent = "Invalid Spotify URL."
            }
        })
        .catch(error => {
            console.log("Error", error);
        });
        return false;
    }

    document.addEventListener("input", () => {
        let acousticValue = document.querySelector("#acousticness-range").value / 100;
        document.querySelector("#acousticness-value").textContent = acousticValue;

        let danceabilityValue = document.querySelector("#danceability-range").value / 100;
        document.querySelector("#danceability-value").textContent = danceabilityValue;

        let energyValue = document.querySelector("#energy-range").value / 100;
        document.querySelector("#energy-value").textContent = energyValue;

        let instrumentalnessValue = document.querySelector("#instrumentalness-range").value / 100;
        document.querySelector("#instrumentalness-value").textContent = instrumentalnessValue;

        let popularityValue = document.querySelector("#popularity-range").value / 100;
        document.querySelector("#popularity-value").textContent = popularityValue;
    })
})