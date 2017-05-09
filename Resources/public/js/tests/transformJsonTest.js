describe("Test the json transform component", function() {

  it("Should parse the fixture1Raw string correctly", function() {
    var raw = JSON.parse(JSON.stringify(fixture1Raw));
    var transformedRaw = transformRawToJson(raw);

    expect(function () {
      JSON.parse(raw);
    }).toThrow();

    expect(function () {
      JSON.parse(transformedRaw);
    }).not.toThrow();
  });

  it("Should parse the fixture2Raw correctly", function() {
    var raw = JSON.parse(JSON.stringify(fixture2Raw));
    var transformedRaw = transformRawToJson(raw);

    expect(function () {
      JSON.parse(raw);
    }).toThrow();

    expect(function () {
      JSON.parse(transformedRaw);
    }).not.toThrow();
  });

  it("Should parse the fixture3Raw correctly", function() {
    var raw = JSON.parse(JSON.stringify(fixture3Raw));
    var transformedRaw = transformRawToJson(raw);

    expect(function () {
      JSON.parse(raw);
    }).toThrow();

    expect(function () {
      JSON.parse(transformedRaw);
    }).not.toThrow();
  });

  it("Should parse the fixture4Raw correctly", function() {
    var raw = JSON.parse(JSON.stringify(fixture4Raw));
    var transformedRaw = transformRawToJson(raw);

    expect(function () {
      JSON.parse(raw);
    }).toThrow();

    expect(function () {
      JSON.parse(transformedRaw);
    }).not.toThrow();
  });

  it("Should parse the fixture5Raw correctly", function() {
    var raw = JSON.parse(JSON.stringify(fixture5Raw));
    var transformedRaw = transformRawToJson(raw);

    expect(function () {
      JSON.parse(raw);
    }).toThrow();

    expect(function () {
      JSON.parse(transformedRaw);
    }).not.toThrow();
  });
});
