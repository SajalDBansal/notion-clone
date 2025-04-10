import { Authpage } from "../_components/Authpage"
import { Quote } from "../_components/Quote"

export default async function Signup() {

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <Authpage type="signup" />
            </div>
            <div className="hidden lg:block">
                <Quote />
            </div>
        </div>

    )
}