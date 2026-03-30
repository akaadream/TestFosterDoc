# Getting Started

> [!WARNING]
> Foster is still a work in progress likely to have frequent breaking changes so please, use it at your own risk!
## Installation
In order to create a Foster project, you've got two solutions:
* Add the reference to the NuGet package (LTS)
* Clone the repository and add a reference the C# project (not stable)

First of all, you have to create a new solution/project. The simplest solution is to create a C# Console Application.
When your project is created, right-click on it and go on its `Properties`. 
In the first `Output type` property, switch the value from `Console Application` to `Windows Application` (you can let `Console Application` when you want to print debug outputs).

Most of the time, you will prefer add the NuGet package into your project.
On Visual Studio, you can right-click on your the project which needs Foster then `Manage NuGet Packages...`. In the `Browse` tab and inside the search bar, you can write `FosterFramework` and install the correct package.

If you are not using Visual Studio or if you want to install it using the console, enter this command at the project's root directory:
```sh
dotnet add package FosterFramework --version 0.3.0
```
## Sample code
> [!NOTE]
> The sample code below is inspired by the [FosterFramework/Samples](https://github.com/FosterFramework/Samples)

Create a Game.cs file and then put this code inside:
```cs
using Foster.Framework;
using System.Numerics;

namespace TestFoster;

public class Game : App
{
    private readonly Batcher batcher;
    private readonly Texture texture;

    public Game(): base(new AppConfig()
    {
        ApplicationName = "Foster tutorial",
        WindowTitle = "My first Foster game",
        Width = 1280,
        Height = 720
    })
    {
        batcher = new(GraphicsDevice);
        texture = new(GraphicsDevice, new Image(128, 128, Color.Blue));
    }

    protected override void Startup()
    {
        
    }

    protected override void Shutdown()
    {
        
    }

    protected override void Update()
    {
        if (Input.Keyboard.Pressed(Keys.Escape))
        {
            Exit();
        }
    }

    protected override void Render()
    {
        Window.Clear(Color.BlanchedAlmond);

        batcher.PushMatrix(
            new Vector2(Window.WidthInPixels, Window.HeightInPixels) / 2,
            new Vector2(texture.Width, texture.Height) / 2,
            Vector2.One,
            (float)Time.Elapsed.TotalSeconds * 4f);

        batcher.Image(texture, Vector2.Zero, Color.White);

        batcher.PopMatrix();

        batcher.Render(Window);
        batcher.Clear();
    }
}
```
If you run your project, nothing may really happens. It's because you did not instanciated your game.
In your `Program.cs`, add these two lines:
```cs
using var game = new TestFoster.Game();
game.Run();
```
Everything should works fine now!