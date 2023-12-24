export const serverUrl = 'http://localhost:3000'

export const randomColor = () => {
    let val = [];
    const xters = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];

    for (let i = 0; i < 6; i++) {
        const character = Math.floor(Math.random() * 16);
        val.push(xters[character]);
    }

    return val.join('');
};

export const backgroundColor = () => {
    const colors = ['0', '125', '140', '255'];
    const bgColor = [];

    for (let i = 0; i < 3; i++) {
        const code = Math.floor(Math.random() * 4);
        bgColor.push(colors[code]);
    }

    return bgColor.join();
};

                    // background: linear-gradient(180deg, rgba(0, 0, 255, 0.15), rgba(0, 0, 255, .1));
                    // background: linear-gradient(180deg, rgba(255, 0, 0, 0.15), rgba(255, 0, 0, .1));
                    // background: linear-gradient(180deg, rgba(255, 0, 255, 0.15), rgba(255, 0, 255, .1));
                    // background: linear-gradient(180deg, rgba(255, 255, 0, 0.15), rgba(255, 255, 0, .1));
                    // background: linear-gradient(180deg, rgba(255, 140, 0, 0.15), rgba(255, 140, 0, .1));
                    // background: linear-gradient(180deg, rgba(0, 255, 0, 0.15), rgba(0, 255, 0, .1));
                    // background: linear-gradient(180deg, rgba(0, 255, 255, 0.15), rgba(0, 255, 255, .1));
                    // background: linear-gradient(180deg, rgba(0, 140, 255, 0.15), rgba(0, 140, 255, .1));
                    // background: linear-gradient(180deg, rgba(125, 0, 255, 0.15), rgba(125, 0, 255, .1));