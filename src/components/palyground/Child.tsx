

function Child({ valueRef }) {
    return (
        <div>
            <textarea name="" id="" onChange={(e) => valueRef.current = e.target.value} aria-label="text area"></textarea>
        </div>
    )
}

export default Child