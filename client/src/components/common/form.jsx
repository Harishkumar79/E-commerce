import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";

function CommonForm({ formControls, formData, setFormData, onSubmit, buttonText }) {

    function inputByComponentType(getControlItem) {
        let element = null;
        const value = formData[getControlItem.name] || "";

        switch (getControlItem.componentType) {
            case "input":
                element = (
                    <Input
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        type={getControlItem.type}
                        value={value}
                        onChange={(event) => {
                            setFormData({
                                ...formData,
                                [getControlItem.name]: event.target.value
                            })
                        }}
                    />
                )
                break;

            case "select":
                element = (
                    <Select onValueChange={
                        (value) => setFormData({
                            ...formData,
                            [getControlItem.name]: value
                        })
                    } value={value}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={getControlItem.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                getControlItem.options &&
                                    getControlItem.options.length > 0 ?
                                    getControlItem.options.map(optionItem => <SelectItem key={optionItem.id} value={optionItem.id}>{optionItem.label}</SelectItem>) : null
                            }
                        </SelectContent>
                    </Select>
                )
                break;

            case "textarea":
                element = (
                    <Textarea
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        value={value}
                        onChange={(event) => {
                            setFormData({
                                ...formData,
                                [getControlItem.name]: event.target.value
                            })
                        }}
                    />
                )
                break;

            default:
                element = (
                    <Input
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        type={getControlItem.type}
                        value={value}
                        onChange={(event) => {
                            setFormData({
                                ...formData,
                                [getControlItem.name]: event.target.value
                            })
                        }}
                    />
                )
                break;
        }
        return element;
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-3">
                {
                    formControls.map(controlItems => <div className="grid w-full gap-1.5" key={controlItems.name}>
                        <Label className="mb-1">{controlItems.label}</Label>
                        {
                            inputByComponentType(controlItems)
                        }
                    </div>)
                }
            </div>
            <Button className="mt-2 w-full" type="submit">{buttonText || "Submit"}</Button>
        </form>
    );
}

export default CommonForm;