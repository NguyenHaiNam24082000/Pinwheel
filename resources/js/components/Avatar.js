import React,{ useState, useCallback} from "react";

export default function Avatar() {
    const [image,setImage] = useState('https://avatars.dicebear.com/api/initials/.svg');
    const [sprites,setSprites] = useState('');

    const handleChange = useCallback((event) => {
        setImage(`https://avatars.dicebear.com/api/avataaars/${event.target.value}.svg`);
    },[])

    const handleSelect = (event) => {
        setSprites(event.target.value)
    }

    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <div className="w-64 h-64 bg-black rounded-box">
                <img src={image}/>
            </div>
            <div className="flex mt-3">
                <select className="select select-bordered select-primary w-36 max-w-xs mr-3" onChange={handleSelect}>
                    <option selected="selected" value="Initials" defaultValue>Initials</option>
                    <option value="Initials">Avataaars</option>
                    <option value="BigEars">Big Ears</option>
                    <option value="BigEarsNeutral">Big Ears Neutral</option>
                    <option value="BigSmile">Big Smile</option>
                    <option value="Bottts">Bottts</option>
                    <option value="Identicon">Identicon</option>
                    <option value="Jdenticon">Jdenticon</option>
                    <option value="Micah">Micah</option>
                    <option value="Miniavs">Miniavs</option>
                    <option value="OpenPeeps">Open Peeps</option>
                    <option value="Personas">Personas</option>
                </select>

                <div className="form-control">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="What is your name?"
                            className="w-full pr-16 input input-primary input-bordered"
                            onChange={handleChange}
                        />
                        <button className="absolute top-0 right-0 rounded-l-none btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
            <div></div>
        </div>
    );
}
