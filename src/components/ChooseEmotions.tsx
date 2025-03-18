const ChooseEmotions = ()=>{
    return (
        <div className="flex flex-col justify-center items-center gap-32">
            <h2 className="text-6xl">Choose your Emotions</h2>
            <div className="gap-2 flex flex-col p-10 border">
                <div className="flex gap-2">
                    <input type="checkbox" />
                    <label>
                        I agree to the terms and conditions
                    </label>
                </div>
                <div className="flex gap-2">
                    <input type="checkbox" />
                    <label>
                        I agree to the terms and conditions
                    </label>
                </div>
                <div className="flex gap-2">
                    <input type="checkbox" />
                    <label>
                        I agree to the terms and conditions
                    </label>
                </div>
            </div>
        </div>
    )
}

export default ChooseEmotions;