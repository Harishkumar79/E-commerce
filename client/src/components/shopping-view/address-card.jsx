import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";


function AddressCard({addressInfo, handleDeleteAddress, handleEditAddress }) {
    return (
        <Card>
            <CardContent className="grid p-4 gap-4">
                <Label>Address : {addressInfo?.address}</Label>
                <Label>City : {addressInfo?.city}</Label>
                <Label>Phone : {addressInfo?.phone}</Label>
                <Label>Pincode : {addressInfo?.pincode}</Label>
                <Label>Notes : {addressInfo?.notes}</Label>
            </CardContent>
            <CardFooter className="flex justify-between p-3">
                <Button onClick={()=>handleEditAddress(addressInfo)}>Edit</Button>
                <Button onClick={()=>handleDeleteAddress(addressInfo)}>Delete</Button>
            </CardFooter>
        </Card>
    );
}

export default AddressCard;