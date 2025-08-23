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
                    tdArtist.textContent = title["artists"][0]["name"];

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
                document.querySelector("dialog").showModal();
                document.querySelector("#error-messages").style.display = "none";
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
    });

    document.addEventListener("change", () => {
        let acousticRange = document.querySelector("#acousticness-range");
        let acousticRangeCheck = document.querySelector("#acousticness-checkbox");
        let acousticValue = document.querySelector("#acousticness-range");
        let acousticValueNumber = document.querySelector("#acousticness-value");

        let danceabilityRange = document.querySelector("#danceability-range");
        let danceabilityRangeCheck = document.querySelector("#danceability-checkbox");
        let danceabilityValue = document.querySelector("#danceability-range");
        let danceabilityValueNumber = document.querySelector("#danceability-value");

        let energyRange = document.querySelector("#energy-range");
        let energyRangeCheck = document.querySelector("#energy-checkbox");
        let energyValue = document.querySelector("#energy-range");
        let energyValueNumber = document.querySelector("#energy-value");

        let instrumentalnessRange = document.querySelector("#instrumentalness-range");
        let instrumentalnessRangeCheck = document.querySelector("#instrumentalness-checkbox");
        let instrumentalnessValue = document.querySelector("#instrumentalness-range");
        let instrumentalnessValueNumber = document.querySelector("#instrumentalness-value");

        let popularityRange = document.querySelector("#popularity-range");
        let popularityRangeCheck = document.querySelector("#popularity-checkbox");
        let popularityValue = document.querySelector("#popularity-range");
        let popularityValueNumber = document.querySelector("#popularity-value");

        if (acousticRangeCheck.checked) {
            acousticRange.disabled = false;
        }
        else if (acousticRangeCheck.checked === false) {
            acousticRange.disabled = true;
            acousticValue.value = 50;
            acousticValueNumber.textContent = 0.5;
        }
        
        if (danceabilityRangeCheck.checked) {
            danceabilityRange.disabled = false;
        }
        else if (danceabilityRangeCheck.checked === false) {
            danceabilityRange.disabled = true;
            danceabilityValue.value = 50;
            danceabilityValueNumber.textContent = 0.5;
        }

        if (energyRangeCheck.checked) {
            energyRange.disabled = false;
        }
        else if (energyRangeCheck.checked === false) {
            energyRange.disabled = true;
            energyValue.value = 50;
            energyValueNumber.textContent = 0.5;
        }

        if (instrumentalnessRangeCheck.checked) {
            instrumentalnessRange.disabled = false;
        }
        else if (instrumentalnessRangeCheck.checked === false) {
            instrumentalnessRange.disabled = true;
            instrumentalnessValue.value = 50;
            instrumentalnessValueNumber.textContent = 0.5;
        }

        if (popularityRangeCheck.checked) {
            popularityRange.disabled = false;
        }
        else if (popularityRangeCheck.checked === false) {
            popularityRange.disabled = true;
            popularityValue.value = 50;
            popularityValueNumber.textContent = 0.5;
        }
    });
});

function assembleAPICall(spotifyURI, acousticnessValue, danceabilityValue, energyValue, instrumentalnessValue, popularityValue) {
    let checkBoxes = document.getElementsByClassName("checkbox");
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
    let checkBoxes = document.getElementsByClassName("checkbox");
    let range = document.getElementsByClassName("range");
    let rangeValue = document.getElementsByClassName("range-value");

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