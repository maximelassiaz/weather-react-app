const CityForm = ({ city, handleChangeCity, handleSubmitCity }) => {
    return (
        <form className="city-form box" onSubmit={handleSubmitCity}>
            <label 
                className="city-form__label" 
                htmlFor="city"
            >
                City :
            </label>
            <input 
                className="city-form__input" 
                type="text" 
                name="city" 
                id="city" 
                value={city}
                placeholder="Choose another location"
                onChange={handleChangeCity}
            />
            <button 
                className="city-form__submit" 
                type="submit"
            >
                Update
            </button>
        </form>
    )
}

export default CityForm
