const sections = document.querySelectorAll('div.section');
const sidebar = document.getElementById('sidebar');

let intersectionOptions = {
    root: document.querySelector('.content'),
    rootMargin: '0px',
    // threshold has to be very low because it calculates area
    // of the target that is seen, *not* the area of the root
    // that's covered by the target
    threshold: 0.1
}

let intersectionCallback = entries => {
    entries.forEach(entry => {
        const targetId = entry.target.id;
        if (targetId in subheadPicker) {
            if (entry.isIntersecting) {
                subheadPicker[targetId].classList.remove('hidden');
            } else {
                subheadPicker[targetId].classList.add('hidden');
            }
        }
    })
}

let observer = new IntersectionObserver(intersectionCallback, intersectionOptions);

let subheadPicker = {};

for (let section of sections) {

    observer.observe(section);

    const head = section.querySelector('h2');

    const headerPara = document.createElement('p');
    headerPara.innerText = head.innerText;
    headerPara.addEventListener('click', () => {
        head.scrollIntoView({
            'block': 'start',
            'inline': 'nearest',
            'behavior': 'smooth'
        });
    });
    sidebar.appendChild(headerPara);

    const subheads = section.querySelectorAll('.subhead');
    const subheadDiv = document.createElement('div');
    for (let subhead of subheads) {
        const subheadPara = document.createElement('p');
        subheadPara.innerText = subhead.innerText;

        subheadPara.addEventListener('click', () => {
            subhead.scrollIntoView({
                'block': 'start',
                'inline': 'nearest',
                'behavior': 'smooth'
            });
        });

        subheadPicker[section.id] = subheadDiv;
        subheadDiv.className = 'subsection hidden';
        subheadDiv.appendChild(subheadPara);
    }
    sidebar.appendChild(subheadDiv);
}