document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#parameters-form").onsubmit = () => {
        let table = document.querySelector("#song-recommendations");
        table.innerHTML = "";  
        let spotifyURI = document.querySelector("#song-id").value.substring(31, 53);
        let acousticnessValue = document.querySelector("#acousticness-value").textContent;
        let danceabilityValue = document.querySelector("#danceability-value").textContent;
        let energyValue = document.querySelector("#energy-value").textContent;
        let instrumentalnessValue = document.querySelector("#instrumentalness-value").textContent;
        let popularityValue = document.querySelector("#popularity-value").textContent * 100;
        resetAll();
        fetch(assembleAPICall(spotifyURI, acousticnessValue, danceabilityValue, energyValue, instrumentalnessValue, popularityValue))
        .then(response => response.json())
        .then(data => {
            if (data["content"] !== undefined)
            {
                let trHeaderRow = document.createElement('tr');
                let thTitleHeader = document.createElement('th');
                thTitleHeader.textContent = "Track Recommendations";
                thTitleHeader.colSpan = 4;
                trHeaderRow.append(thTitleHeader);
                table.append(trHeaderRow);

                let trColumnNames = document.createElement('tr');
                let thColumnNameArtist = document.createElement('th');
                let thColumnNameSongTitle = document.createElement('th');
                let thColumnNameSongLink = document.createElement('th');
                let thColumnNameNumber = document.createElement('th');

                thColumnNameArtist.textContent = "Artist(s)";
                thColumnNameSongTitle.textContent = "Track Title"
                thColumnNameSongLink.textContent = "Link"
                thColumnNameNumber.textContent = "No."

                trColumnNames.append(thColumnNameNumber);
                trColumnNames.append(thColumnNameArtist);
                trColumnNames.append(thColumnNameSongTitle);
                trColumnNames.append(thColumnNameSongLink);
                table.append(trColumnNames);

                let counter = 0;

                data["content"].forEach(title => {
                    counter++;
                    let tr = document.createElement('tr');
                    let tdCounter = document.createElement('td');
                    tdCounter.textContent = `${counter}.`;
                    let tdArtist = document.createElement('td');
                    let artistNames = [];
                    
                    // Get the names of all of the artists who are on the track.
                    title["artists"].forEach(artistName => {
                        artistNames.push(artistName["name"]);
                    })
                    tdArtist.textContent = artistNames.join(", ");
                    let tdTrackTitle = document.createElement('td');
                    tdTrackTitle.textContent = title["trackTitle"];
                    let tdSongLink = document.createElement('td');
                    let songLink = document.createElement('a');
                    songLink.href = title["href"];
                    songLink.textContent = "Link";
                    tdSongLink.appendChild(songLink);
                    tr.appendChild(tdCounter);
                    tr.appendChild(tdArtist);
                    tr.appendChild(tdTrackTitle);
                    tr.appendChild(tdSongLink);
                    table.appendChild(tr);
                });
                // document.querySelector("#seed-track-text").textContent = `From your seed track of ${getTrackDetail(spotifyURI)}, here are your song recommendations!`
                document.querySelector("dialog").showModal();
                document.querySelector("#error-messages").style.display = "none";
            } else {
                document.querySelector("#error-messages").textContent = "Invalid Spotify URL."
            }
        })
        .catch(error => {
            console.log("Error", error);
        });
        return false;
    }

    document.addEventListener("input", () => {
        let parametersRange = document.querySelectorAll(".range");
        let parametersTextContent = document.querySelectorAll(".range-value");
        for (let i = 0; i < parametersRange.length; i++) {
            parametersTextContent[i].textContent = parametersRange[i].value / 100;
        }
    });

    document.addEventListener("change", () => {
        let parametersRange = document.querySelectorAll(".range");
        let parametersRangeCheck = document.querySelectorAll(".checkbox");
        let parametersValueNumber = document.querySelectorAll(".range-value");
        for (let i = 0; i < parametersRange.length; i++) {
            if(parametersRangeCheck[i].checked) {
                parametersRange[i].disabled = false;
            } else if(parametersRangeCheck[i].checked === false) {
                parametersRange[i].disabled = true;
                parametersRange[i].value = 50;
                parametersValueNumber[i].textContent = 0.5;
            }
        }
    });
});

function assembleAPICall(spotifyURI, acousticnessValue, danceabilityValue, energyValue, instrumentalnessValue, popularityValue) {
    let checkBoxes = document.querySelectorAll(".checkbox");
    let variableLookupObj = {
        "acousticness": acousticnessValue,
        "danceability" : danceabilityValue,
        "energy" : energyValue,
        "instrumentalness" : instrumentalnessValue,
        "popularity" : popularityValue,
    }
    let reccoBeatsCall = `https://api.reccobeats.com/v1/track/recommendation?size=10&seeds=${spotifyURI}`;
    for(let i = 0; i < checkBoxes.length; i++) {
        if(checkBoxes[i].checked) {
            let parameterName = checkBoxes[i].id.split("-")[0]
            reccoBeatsCall += `&${parameterName}=${variableLookupObj[parameterName]}`
        }
    }
    return reccoBeatsCall;
};

function resetAll() {
    document.querySelector("#song-id").value = "";
    let checkBoxes = document.querySelectorAll(".checkbox");
    let range = document.querySelectorAll(".range");
    let rangeValue = document.querySelectorAll(".range-value");
    for (let i = 0; i < checkBoxes.length; i++) {
        checkBoxes[i].checked = false;
        range[i].disabled = true;
        range[i].value = 50;
        rangeValue[i].textContent = 0.5;
    }
}

function closeModal() {
    document.querySelector("dialog").close();
}

function getTrackDetail(spotifyURI) {
    fetch(`https://api.reccobeats.com/v1/track?ids=${spotifyURI}`)
    .then(response => response.json())
    .then(data => {
        let trackTitle = data["content"][0]["trackTitle"];
        console.log(`${trackTitle} <- here is the track name.` )
        return trackTitle;
    });
}