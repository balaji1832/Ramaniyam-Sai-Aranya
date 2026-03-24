//  Nearby Landmarks Script 
      const nearbyData = {
        schools: {
          title: "Schools Nearby",
          items: [
            { name: "Nathan Girls High School", distance: "0.13 KM" },
            {
              name: "Lbeaar Matriculation Higher Secondary School",
              distance: "0.25 KM",
            },
            { name: "GRD Vidyalaya", distance: "0.68 KM" },
            {
              name: "Daniel Thomas Matriculation Higher Secondary School",
              distance: "0.73 KM",
            },
            { name: "Scope Global School", distance: "0.78 KM" },
            {
              name: "Chinmaya Vidhyala Higher Secondary School",
              distance: "1.26 KM",
            },
            { name: "Little Elly", distance: "1.29 KM" },
            { name: "Marthoma Matriculation School", distance: "1.35 KM" },
            {
              name: "Chinmaya Vidyalaya Higher Secondary School",
              distance: "1.38 KM",
            },
            { name: "Velammal School", distance: "1.57 KM" },
          ],
        },

        hospitals: {
          title: "Hospitals Nearby",
          items: [
            { name: "KKR Hospital", distance: "0.85 KM" },
            { name: "Chennai Hospital", distance: "1.17 KM" },
            { name: "Life Healthcare", distance: "1.18 KM" },
            { name: "New Life Family Hospital", distance: "1.24 KM" },
            { name: "Sridevi Hospitals", distance: "1.24 KM" },
            { name: "K M Hospital And Polyclinic", distance: "1.52 KM" },
            { name: "Sri Balaji Hospital SBS Hospital", distance: "1.53 KM" },
            { name: "Srinivas Eye Hospital", distance: "1.56 KM" },
            { name: "Vee Care Hospital", distance: "1.57 KM" },
            { name: "Raghavi Hospital", distance: "1.62 KM" },
          ],
        },

        temples: {
          title: "Temples Nearby",
          items: [
            { name: "Ganesh Saai Temple", distance: "1.09 KM" },
            { name: "Aiyappan Temple", distance: "1.31 KM" },
            { name: "Murugan Temple", distance: "1.83 KM" },
            { name: "Sri Raja Rajeswari Temple", distance: "1.90 KM" },
            { name: "Vetri Vinayagar Temple", distance: "1.98 KM" },
            { name: "Nagathamman Temple", distance: "2.22 KM" },
            { name: "Aadhi Parasakthi Temple", distance: "2.23 KM" },
            { name: "Seemathamman Temple", distance: "2.34 KM" },
            { name: "Vinayakar Temple", distance: "2.50 KM" },
            { name: "Sri Varatharaja Perumal Temple", distance: "2.53 KM" },
          ],
        },

        banks: {
          title: "Banks Nearby",
          items: [
            { name: "ICICI Bank", distance: "1.39 KM" },
            { name: "City Union Bank Ltd", distance: "1.47 KM" },
            { name: "Yes Bank", distance: "1.54 KM" },
            { name: "Axis Bank", distance: "1.57 KM" },
            { name: "Kotak Mahindra Bank", distance: "1.58 KM" },
            { name: "Punjab And Sind Bank", distance: "1.59 KM" },
            { name: "UCO Bank", distance: "1.70 KM" },
            { name: "Axis Bank Ltd", distance: "2.52 KM" },
            { name: "State Bank Of India", distance: "2.68 KM" },
            { name: "ICICI Bank Ltd", distance: "2.76 KM" },
          ],
        },

        parks: {
          title: "Parks Nearby",
          items: [
            { name: "Aiyappa Nagar Park", distance: "0.89 KM" },
            { name: "VGN Avenue Park", distance: "1.36 KM" },
            { name: "Chennai Corporation Park", distance: "1.57 KM" },
            { name: "Annai Flats Park", distance: "1.57 KM" },
            { name: "Konkraft Karpenderz", distance: "1.65 KM" },
            { name: "Ladies And Children Park", distance: "1.97 KM" },
            { name: "The Parkshanthiniketan Colony", distance: "1.97 KM" },
            { name: "Mangal Eri Park", distance: "2.12 KM" },
            { name: "Corporation Park", distance: "2.13 KM" },
            { name: "Officers Colony Walkers Park", distance: "2.22 KM" },
          ],
        },

        churches: {
          title: "Churches Nearby",
          items: [
            {
              name: "Christ Methodist Church Chinmaya Nagar",
              distance: "1.04 KM",
            },
            { name: "St Antony Church", distance: "1.51 KM" },
            { name: "CSI Calvary Church Pastorate", distance: "1.58 KM" },
            {
              name: "St Thomas Jacobite Syrian Orthodox Church",
              distance: "1.75 KM",
            },
            { name: "Advent Christian Church", distance: "1.76 KM" },
            { name: "New Calvary Church", distance: "2.21 KM" },
            { name: "ECI Golden Jubilee Church", distance: "2.23 KM" },
            { name: "St Antonys Church", distance: "2.30 KM" },
            { name: "CSI Church Of Resurrection", distance: "2.37 KM" },
            { name: "Full Gospel Church", distance: "2.97 KM" },
          ],
        },

        cinemaHalls: {
          title: "Cinema Halls Nearby",
          items: [
            { name: "Rohini Cinemas", distance: "1.10 KM" },
            { name: "PVR Cinemas VR Chennai Mall", distance: "1.52 KM" },
            { name: "Sri Devi Karumari Amman Cinemas", distance: "2.42 KM" },
            { name: "Lakshmi Bala Movie Park Cinemas", distance: "2.68 KM" },
            { name: "Lakshmibala Theatre", distance: "2.68 KM" },
            { name: "AGS Cinemas", distance: "2.68 KM" },
            { name: "Sivasakthi Cinema Hall", distance: "2.70 KM" },
            { name: "Sivasakthi Theatre", distance: "2.71 KM" },
            { name: "AVM Rajeshwari Cinema Hall", distance: "3.22 KM" },
            {
              name: "Palazzo Cinemas The Forum Vijaya Mall",
              distance: "3.30 KM",
            },
          ],
        },

        colleges: {
          title: "Colleges & Universities Nearby",
          items: [
            { name: "Dr MGR University", distance: "0.96 KM" },
            { name: "Thai Moogambigai Dental College", distance: "1.00 KM" },
            { name: "Bright Minds Preschool", distance: "1.02 KM" },
            { name: "Ljosaphine Mary MCA Professor", distance: "2.28 KM" },
            { name: "Advent", distance: "2.35 KM" },
            { name: "Manonmaniam Sundaranar University", distance: "2.69 KM" },
            {
              name: "Alagappa University Centre For Excellence",
              distance: "2.69 KM",
            },
            { name: "University Of Leicester", distance: "2.77 KM" },
            {
              name: "MGR Institute Of Hotel Management And Catering Technology",
              distance: "2.83 KM",
            },
            { name: "Josh Academy Of Music And Dance", distance: "2.88 KM" },
          ],
        },

        postOffices: {
          title: "Post Offices Nearby",
          items: [
            { name: "Post Office", distance: "1.15 KM" },
            { name: "Saravana Service Station", distance: "1.39 KM" },
            { name: "Veerabadran Enterprises", distance: "1.59 KM" },
            { name: "Post Office", distance: "2.46 KM" },
            { name: "Shalom Enterprises", distance: "2.58 KM" },
            { name: "Post Office", distance: "3.03 KM" },
            {
              name: "Arulmigu Sri Sarvasakthi Vinayagar Temple",
              distance: "3.10 KM",
            },
            { name: "Godwin Enterprises", distance: "3.11 KM" },
            { name: "Arokian Petrol Bunk", distance: "3.11 KM" },
            { name: "Velayudham Petrol Bunk", distance: "3.12 KM" },
          ],
        },

        shoppingMalls: {
          title: "Shopping Malls Nearby",
          items: [
            { name: "Ten Square Mall", distance: "1.78 KM" },
            { name: "Doshi Garden Shopping Mall", distance: "3.31 KM" },
            { name: "Forum Vijaya Mall", distance: "3.33 KM" },
            { name: "Vijaya Forum Mall", distance: "3.37 KM" },
            { name: "Raahat Plaza", distance: "3.38 KM" },
            { name: "New Saravana Stores Furniture", distance: "3.41 KM" },
            { name: "Waves", distance: "3.46 KM" },
            { name: "Indira Arcade", distance: "3.65 KM" },
            { name: "Ampa Skywalk Mall", distance: "3.73 KM" },
            { name: "Ampa Skywalk", distance: "3.73 KM" },
          ],
        },
      };

      const tabs = document.querySelectorAll(".nearby-tab");
      const titleEl = document.getElementById("nearbyTitle");
      const countEl = document.getElementById("nearbyCount");
      const listEl = document.getElementById("nearbyList");

      function renderNearby(tabKey) {
        const section = nearbyData[tabKey];
        titleEl.textContent = section.title;
        countEl.textContent = section.items.length;

        listEl.innerHTML = section.items
          .map(
            (item, index) => `
      <div class="nearby-item">
        <div class="nearby-item-left">
          <span class="nearby-item-number">${index + 1}</span>
          <p class="nearby-item-name">${item.name}</p>
        </div>
        <div class="nearby-item-distance">
          <span class="nearby-item-pin">📍</span>
          <span>${item.distance}</span>
        </div>
      </div>
    `,
          )
          .join("");

        tabs.forEach((tab) => {
          const active = tab.dataset.tab === tabKey;
          tab.classList.toggle("active", active);
        });
      }

      tabs.forEach((tab) => {
        tab.addEventListener("click", () => renderNearby(tab.dataset.tab));
      });

      renderNearby("schools");
