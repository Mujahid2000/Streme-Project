import { Box, Button, Input } from "@mui/material";
import { useState } from "react";

const CommentForm = ({
    handleSubmit,
    submitLabel,
    hasCancelButton = false,
    initialText = '',
    handleCancel,
}) => {
    const [text, setText] = useState(initialText);
    const textAreaDisable = text.length === 0;

    const onSubmit = e => {
        e.preventDefault();
        handleSubmit(text)
        setText('')
    }

    const inputStyle = {
        border: 1,
        height: 100,
        width: '100%',
        marginLeft: 3,
        padding: 3,
        color: "white",
        borderColor: 'rgb(28, 199, 73)',
        fontSize: { xs: 14, sm: 17 }

    }
    return (
        <form onSubmit={onSubmit} className="w-full text-white">
            <Input onChange={(e) => setText(e.target.value)} value={text} placeholder='Write a Comment' sx={inputStyle} InputProps={{ disableUnderline: true }} />
            <Box sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right', marginTop: '5px', marginLeft: 3, width: '100%', }}>
                <Button sx={{ fontSize: { xs: 12, sm: 15 },}} type="submit" disabled={textAreaDisable} className='bg-blue-400' variant="contained">{submitLabel}</Button>
                {hasCancelButton &&
                    <Button className="bg-[#2C2F34] hover:bg-slate-200" type="button"
                        onClick={handleCancel}
                    >Cancel</Button>}
            </Box>
        </form>
    );
};

export default CommentForm;