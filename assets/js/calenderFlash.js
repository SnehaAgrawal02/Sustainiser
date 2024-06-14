document.addEventListener('DOMContentLoaded' , function(){

    const events = {
        5: {name: 'Paudharopan', location: 'Local Garden'},
        12: {name: 'Paudharopan', location: 'Local Garden'},
        18: {name: 'Paudharopan', location: 'Local Garden'},
        25: {name: 'Paudharopan', location: 'Local Garden'}
    };

    function showFlashMessage(dataElement, event){
        const flashMessage = document.getElementById('flash-mesage');
        flashMessage.textContent = 'Event: ${event.name, Location: ${event.location}';

        flashMessage.style.display = 'block';
        flashMessage.style.position = 'absolute';
        flashMessage.style.top = '${dataElement.offsetLeft}px';
    }

    function hideFlashMessage(){
        const flashMessage = document.getElementById('flash-message');
        flashMessage.style.display = 'none';
    }

    Object.keys(events).forEach(data => {
        const dataElement = document.getElementById('data-${data}');
        
        if(dataElement){
            dataElement.addEventListener('mouseover', function(){
                showFlashMessage(dataElement, events[date]);
            });

            dataElement.addEventListener('mouseout',hideFlashMessage())
        }
    });
});


// document.addEventListener('DOMContentLoaded', function() {
//     const events = {
//         5: {name: 'Paudharopan', location: 'Local Garden'},
//         12: {name: 'Paudharopan', location: 'Local Garden'},
//         18: {name: 'Paudharopan', location: 'Local Garden'},
//         25: {name: 'Paudharopan', location: 'Local Garden'}
//     };

//     function showFlashMessage(dataElement, event) {
//         const flashMessage = document.getElementById('flash-message');
//         flashMessage.textContent = Event: ${event.name}, Location: ${event.location};
//         flashMessage.style.display = 'block';
//         flashMessage.style.position = 'absolute';
//         flashMessage.style.top = ${dataElement.getBoundingClientRect().top + window.scrollY}px;
//         flashMessage.style.left = ${dataElement.getBoundingClientRect().left + window.scrollX}px;
//     }

//     function hideFlashMessage() {
//         const flashMessage = document.getElementById('flash-message');
//         flashMessage.style.display = 'none';
//     }
//     Object.keys(events).forEach(date => {
//         const dataElement = document.getElementById(data-${date});
        
//         if(dataElement){
//             dataElement.addEventListener('mouseover', function() {
//                 showFlashMessage(dataElement, events[date]);
//             });

//             dataElement.addEventListener('mouseout', hideFlashMessage);
//         }
//     });
// });
