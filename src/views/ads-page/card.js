<Grid item xs={12} md={3} style={{ flex: 1, marginTop: 35 }}>
    {/* ----------------------Card one------------------------ */}
    <Card>
        <CardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography color="text.secondary" variant="h5">
                    Top Locations
                </Typography>
            </div>
            <hr />
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: '-30px' }}>
                    <PieChart
                        series={[
                            {
                                innerRadius: 50,
                                outerRadius: 60,
                                data: data.map((item) => ({
                                    ...item,
                                    value: (item.value / data.reduce((sum, item) => sum + item.value, 0)) * 100
                                }))
                            }
                        ]}
                        width={250}
                        height={250}
                        legend={{ legend: false }}
                    />
                </div>
                <div>
                    {data.map((item, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <div
                                style={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    backgroundColor: item.color,
                                    marginRight: '5px'
                                }}
                            />
                            <Typography variant="body2" color="text.secondary">
                                <span>{item.label}</span>
                                <span style={{ marginLeft: '25px' }}>
                                    {((item.value / data.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(0)}%
                                </span>
                            </Typography>
                        </div>
                    ))}
                </div>
            </div>
        </CardContent>
    </Card>
    {/* ----------------------Card two------------------------ */}
    <Card style={{ marginTop: 10 }}>
        <CardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography color="text.secondary" variant="h5">
                    Top Age Range
                </Typography>
            </div>
            <hr />
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: '-30px' }}>
                    <PieChart
                        series={[
                            {
                                innerRadius: 50,
                                outerRadius: 60,
                                data: data2.map((item) => ({
                                    ...item,
                                    value: (item.value / data2.reduce((sum, item) => sum + item.value, 0)) * 100
                                }))
                            }
                        ]}
                        width={250}
                        height={250}
                        legend={{ legend: false }}
                    />
                </div>
                <div>
                    {data2.map((item, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <div
                                style={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    backgroundColor: item.color,
                                    marginRight: '5px'
                                }}
                            />
                            <Typography variant="body2" color="text.secondary">
                                <span>{item.label}</span>
                                <span style={{ marginLeft: '25px' }}>
                                    {((item.value / data2.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(0)}%
                                </span>
                            </Typography>
                        </div>
                    ))}
                </div>
            </div>
        </CardContent>
    </Card>
    {/* ----------------------Card three------------------------ */}
    <Card style={{ marginTop: 10 }}>
        <CardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography color="text.secondary" variant="h5">
                    Top Gender
                </Typography>
            </div>
            <hr />
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: '-30px' }}>
                    <PieChart
                        series={[
                            {
                                innerRadius: 50,
                                outerRadius: 60,
                                data: data3.map((item) => ({
                                    ...item,
                                    value: (item.value / data3.reduce((sum, item) => sum + item.value, 0)) * 100
                                }))
                            }
                        ]}
                        width={250}
                        height={250}
                        legend={{ legend: false }}
                    />
                </div>
                <div>
                    {data3.map((item, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <div
                                style={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    backgroundColor: item.color,
                                    marginRight: '5px'
                                }}
                            />
                            <Typography variant="body2" color="text.secondary">
                                <span>{item.label}</span>
                                <span style={{ marginLeft: '25px' }}>
                                    {((item.value / data3.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(0)}%
                                </span>
                            </Typography>
                        </div>
                    ))}
                </div>
            </div>
        </CardContent>
    </Card>
</Grid>;
