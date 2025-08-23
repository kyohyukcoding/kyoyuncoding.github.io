document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#parameters-form").onsubmit = () => {
        let table = document.querySelector("#song-recommendations");
        table.innerHTML = "";  
        let spotifyURI = document.querySelector("#song-id").value.substring(31, 53);
        document.querySelector("#song-id").value = "";
                
        fetch(`https://api.reccobeats.com/v1/track/recommendation?size=10&seeds=${spotifyURI}`)
        .then(response => response.json())
        .then(data => {

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