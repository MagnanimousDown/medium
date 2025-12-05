import TextType from "./TextType"

export const Quote = () => {
    return ( 
    <div className="bg-slate-200 h-screen flex flex-col justify-center">
        <div className="flex justify-center">
            <div className="max-w-lg">
                <div className="text-4xl font-bold">
                <TextType
                text={["Every idea deserves a blank page.", "Every story starts with a single sentence. Write yours today.", "Your words can change someone’s world — start writing."]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
                />
                </div>
                {/* <div className="font-semibold mt-4">
                    Omkar Aiya
                </div>
                <div className="text-gray-700 font-light">
                    CEO, Medium-Like
                </div> */}
            </div>
        </div>
    </div>
    )
}