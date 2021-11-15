import React from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label

} from "reactstrap";

const ModalComp = ({ activeItem, setActiveItem, toggle, onSave }) => {


    const handleChange = e => {
        if (e.target.type === "checkbox") {
            setActiveItem({ ...activeItem, [e.target.value]: e.target.checked });
            return
        }
        setActiveItem({ ...activeItem, [e.target.name]: e.target.value });
    };

    return (
        <Modal isOpen={true} toggle={toggle}>
            <ModalHeader toggle={toggle}>Todo Item</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input
                            type="text"
                            name="title"
                            // value={changeItem.title}
                            onChange={handleChange}
                            placeholder="Enter Todo Title"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input
                            type="text"
                            name="description"
                            // value={description}
                            onChange={handleChange}
                            placeholder="Enter Todo description"
                        />
                    </FormGroup>
                    <FormGroup check>
                        <Label for="completed">
                            <Input
                                type="checkbox"
                                name="completed"
                                // checked={completed}
                                onChange={handleChange}
                            />
                            Completed
                        </Label>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="success" onClick={() => onSave(activeItem)}>
                    Save
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalComp
