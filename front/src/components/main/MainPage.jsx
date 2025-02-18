import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ChartView from "./ChartView";
import PointService from "@/services/PointService";

const MainPage = () => {
    const [currentX, setCurrentX] = useState("-4");
    const [currentR, setCurrentR] = useState("4");
    const [currentY, setCurrentY] = useState("");

    const [lastR, setLastR] = useState(4);
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const userId = localStorage.getItem('userid');

    const { handleSubmit, setError, clearErrors, formState: { errors } } = useForm();

    const fetchResults = async () => {
        setIsLoading(true);
        setIsError(false);
        try {
            const data = await PointService.getResults();
            setResults(data);
        } catch (error) {
            setIsError(true);
            console.error("Error fetching results:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchResults();
        };
        fetchData();
    }, []);

    const onSubmit = async () => {
        const y = currentY.replace(/,/g, '.').replace(/^\+/, '');
        const newPoint = { x: parseFloat(currentX), y: parseFloat(y), r: parseFloat(currentR), userId: +userId };
        const response = await PointService.checkPoint(newPoint);
        setResults((prevResults) => [response, ...prevResults]);
    };

    const onXChange = (e) => {
        setCurrentX(e.target.value);
    };

    const onRChange = (e) => {
        if (e.target.value < 0) {
            setError("r", { type: "manual", message: "R must be positive" });
            return;
        } else {
            clearErrors('r');
        }
        const value = e.target.value;
        setCurrentR(value);
        setLastR(parseFloat(value));
    };

    const onYchange = (e) => {
        e.target.value = e.target.value.replace(/[^0-9eE.-]/g, '');
        if (!/^-?\d+(\.\d+)?$/.test(e.target.value)){
            setError("y", { type: "manual", message: "Invalid Y value" });
        } else if (!/^[+-]?(?:[0-2]|-[1-4])(?:[.,]\d+)?$/.test(e.target.value)) {
            setError("y", { type: "manual", message: "Y must be in (-5;3)" });
        } else {
            clearErrors('y');
            setCurrentY(e.target.value);
        }
    };

    const handleClickChart = async (coordinate) => {
        const newPoint = { ...coordinate, r: parseFloat(currentR), userId: +userId };
        const response = await PointService.checkPoint(newPoint);
        setResults((prevResults) => [response, ...prevResults]);
    };

    const handleClearTable = async () => {
        try {
            await PointService.clearResults();
            await fetchResults();
        } catch (error) {
            console.error("Error clearing results:", error);
        }
    };

    const checkBoxItems = [
        { label: '-4', value: '-4' },
        { label: '-3', value: '-3' },
        { label: '-2', value: '-2' },
        { label: '-1', value: '-1' },
        { label: '0', value: '0' },
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
    ];

    const mapResultsToChartItems = () => {
        return results
            .filter(res => parseFloat(res.r) === lastR)
            .map(res => ({
                x: parseFloat(res.x),
                y: parseFloat(res.y),
                r: parseFloat(res.r),
                color: res.isValid ? "green" : "red"
            }));
    };

    return (
        <div className="main-wrapper">
            <div className="main-left-block">
                <div className="graph-container">
                    {isLoading && <div>Loading...</div>}
                    {isError && <p>Something went wrong...</p>}
                    {!isLoading && !isError && (
                        <ChartView
                            width={300} height={300}
                            minX={-6} maxX={6}
                            minY={-6} maxY={6}
                            radius={lastR}
                            items={mapResultsToChartItems()}
                            onClickChart={handleClickChart}
                        />
                    )}
                </div>
                <div className="form-container">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-inputs">
                            <div className="form-column">
                            <div className="form-row">
                                <label className="form-label">X =</label>
                                <div className="select-container">
                                    <div className="select">
                                        <select
                                            value={currentX}
                                            onChange={onXChange}
                                            className={errors.x ? "invalid-field" : ''}
                                        >
                                            {checkBoxItems.map(item => (
                                                <option key={item.value} value={item.value}>{item.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="error-container">
                                        {errors.x && <p className="error-message">{errors.x.message}</p>}
                                    </div>
                            </div>

                            <div className="form-column">
                            <div className="form-row">
                                <label htmlFor="y" className="form-label">Y =</label>

                                <input
                                    type="text"
                                    name="y"
                                    required
                                    placeholder="Enter Y in the range (-5;3)"
                                    className={"custom-input " + (errors.y ? "invalid-field" : '')}
                                    onInput={onYchange}
                                />
                            </div>
                            <div className="error-container">
                                    {errors.y && <p className="error-message">{errors.y.message}</p>}
                                </div>
                            </div>
                            <div className="form-column">
                            <div className="form-row">
                                <label className="form-label">R =</label>

                                <div className="select-container">
                                    <div className="select">
                                        <select
                                            value={currentR}
                                            onChange={onRChange}
                                            className={errors.r ? "invalid-field" : ''}

                                        >
                                            {checkBoxItems.map(item => (
                                                <option key={item.value} value={item.value}>{item.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="error-container">
                                        {errors.r && <p className="error-message">{errors.r.message}</p>}
                                    </div>
                            </div>

                            <div className="form-row form-btn-row">
                                <button type="submit" className="custom-button">Check</button>
                                <button type="button" onClick={handleClearTable} className="custom-button">Clear Table</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="main-table-block">
            <h1>Results</h1>

                {isLoading && <div>Loading...</div>}
                {isError && <p>Something went wrong...</p>}
                {!isLoading && !isError && (
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>X</th>
                                <th>Y</th>
                                <th>R</th>
                                <th>Username</th>
                                <th>Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((result) => {
                                console.log(result)
                                return (
                                    <tr key={result.id}>
                                        <td>{result.x.toString().replace('.', ',')}</td>
                                        <td>{result.y.toString().replace('.', ',')}</td>
                                        <td>{result.r.toString().replace('.', ',')}</td>
                                        <td>{result.username}</td>
                                        <td style={{ color: result.isValid ? "green" : "red" }}>
                                            {result.isValid ? "hit" : "miss"}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default MainPage;
