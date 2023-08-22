import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';


export const POST = async (request) => {
    //extract data you passed from post request
    const { userId, prompt, tag } = await request.json();

    try {
        //have to connect to database every time because it is a lambda function
        await connectToDB();
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });
    }

}