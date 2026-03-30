# Foster documentation
Written using [DocFX](https://dotnet.github.io/docfx/index.html)
Theme based on [Singulinkfx](https://github.com/Singulink/SingulinkFX) but modified

## Build the documentation
First of all, you have to put the foster built .dll inside the bin/ folder, then, you run the following command:
```sh
docfx docfx.json --serve
```
The tool will create a `api/` and a `_site/` folders. If you ran the command localy, you can preview the documentation website on http://localhost:8080
