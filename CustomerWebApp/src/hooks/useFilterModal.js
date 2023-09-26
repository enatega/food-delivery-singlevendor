import React, { useState } from "react";

export default function useFilterModal() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen)
    }


    return { isOpen, toggleModal };
}
