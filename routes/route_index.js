import GreetingsExercise from "../greet";
let greet_instance = GreetingsExercise();

export default function indexRoute() {

    async function make_greeting(req, res) {
        try {
            const error_message = req.flash('errorDisplay')[0];
            const reset_message = req.flash('resetMessage')[0];
            const greetingCount = await greet_instance.countGreet(db)
            const shouldShowGreeting = !error_message; // Hide greeting if error message is present

            res.render('index', {
                theGreeting: shouldShowGreeting ? greet_instance.getGreeting() : '',
                counter: greetingCount,
                error_messages: error_message,
                reset_message: reset_message
            })
        }

        catch (error) {
            console.log('Error generating greeting', error)
        }
    }

    async function reset(req, res) {
        try {
            greet_instance.reset();
            req.flash('resetMessage', 'You have cleared your database!')
            res.redirect('/')
        }
        catch (error) {
            console.log('Error reseting your webapp', error)
        }
    }

    return {
        make_greeting,
        reset

    }
}
