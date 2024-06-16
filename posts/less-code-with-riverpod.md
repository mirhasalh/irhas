---
title: Less code with Riverpod
date: 2024-04-24
src: https://i.ibb.co/WvVQXvp/IMG-20240616-192303.png
---

In Flutter app development, there's no one-size-fits-all state management solution, or organizing its architecture. The best choice depends on your project's specific needs. For instance, BLoC may be suitable for a casual game, GetX for a simpler app, and Riverpod for a complex one with many pages and APIs. Remember, recommendations should be approached cautiously—ultimately, the decision rests with you, tailored to your project's unique demands.

In this article, we're not just using Riverpod, we'll also be using a few other packages that work together with Riverpod, which I like to call the Riverpod gang. To explore the benefits of using Riverpod, we'll create a simple app that fetches data from an open-source API and displays it on the page. Afterward, we'll see how much work is reduced due to the benefits we gain. Here are a couple of benefits we'll get later on:

1. We don't need to code the data conversion from JSON to Dart and vice versa.
2. We write less code to utilize an async variable for displaying it on a page.
3. We have a caching system in place without having to write it ourselves.

So, to get the most out of this article, I highly recommend following along and coding with us. To start, let's create a new Flutter app using these CLI commands:

```bash
# The basic way to create a new Flutter app
flutter create my_app

# Or include the organization name & target platform
flutter create --org com.example my_app --platforms=android
```

While the new Flutter app is still fresh, let's bring up the Riverpod gang that I mentioned before. Here's what I have in my `pubspec.yaml`:

```yaml title="pubspec.yaml"
# Consider not copying and pasting this code.
# Instead, please refer to pub.dev to get
# the most up-to-date version.
dependencies:
  # Existing codes
  riverpod:
  riverpod_annotation:
  flutter_riverpod:
  freezed_annotation:

dev_dependencies:
  # Existing codes
  custom_lint:
  riverpod_lint:
  json_serializable:
  riverpod_generator:
  build_runner:
  freezed:

flutter:
  # Existing codes
  generate: true
```

As I used `riverpod_lint`, a custom lint tool, you’re required to make adjustments in the `analysis_options.yaml` file. For detailed instructions, please refer to its [documentation.](https://pub.dev/packages/riverpod_lint) Alternatively, you can simply copy and paste the configuration provided below:

```yaml title="analysis_options.yaml"
# Existing codes
analyzer:
  plugins:
    - custom_lint
	exclude:
    - "**/*.g.dart"
    - "**/*.freezed.dart"
  errors:
    invalid_annotation_target: ignore
```

I introduce you to `flutter_scripts`, which is a secret tool that is pretty overlooked among Flutter developers. It allows you to avoid memorizing long CLI commands to run certain things.

Read the documentation about [flutter_scripts](https://pub.dev/packages/flutter_scripts) for the activation guide. Alternatively, you can simply run the following CLI commands below to activate it globally:

```bash
dart pub global activate flutter_scripts
```

Once it is activated correctly, you can run it by entering `flutter_scripts run` in your terminal, choose the task you want to run with the arrow keys on your keyboard, and hit enter. If you're a JavaScript developer, you've likely encountered something similar to this in Node.js quite frequently.

To set up a tasks that `flutter_scripts` will run, you can place it inside your `pubspec.yaml` file at the very bottom, like the following example below:

```yaml title="pubspec.yaml"
  # Run scripts defined in a pubspec.yaml file just like in Node.js with the `flutter_scripts run` command.
scripts:
  build: dart run build_runner build --delete-conflicting-outputs
  watch: dart run build_runner watch
  generate_launcher_icons: dart run flutter_launcher_icons -f flutter_launcher_icons.yaml
```

Now, let's start working on the Flutter app.

I'm providing Dart code below to replace the entire counter app you already have. After replacing it, don't be alarmed if you see a couple of lint warnings in `main.dart` or the `test` folder. We'll address those things later in this article. With that said, you can copy the code below to replace the counter app entirely inside `lib/main.dart`.

```dart title="lib/main.dart"
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

void main() => runApp(const App());

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const HomePage(),
    );
  }
}

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Flutter Demo"),
      ),
      body: const Center(child: Text("Flutter Demo")),
    );
  }
}
```

Later in this article, we'll have generated files. Therefore, we'll create a bit of folder structure inside our `lib` folder to organize things up. let's create a new folder and files to follow the folder structure provided below:

```text
my_app/
├ lib/
│ ├ src/
│ │ ├ models/
│ │ │ └ [your generated model files]
│ │ ├ pages/
│ │ │ └ [your pages]
│ │ ├ providers/
│ │ │ └ [your generated provider files]
│ │ ├ app.dart
│ │ └ apis.dart
│ └ main.dart
└ [other files & folders]
```

Currently, we have an entire Dart code inside our `main.dart`. So, let's follow the guide below, to separate the code inside `main.dart` into a new folder and files that we already created:

```dart title="lib/src/app.dart"
// lib/src/app.dart

import 'package:flutter/material.dart';

import 'pages/home_page.dart';

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const HomePage(),
    );
  }
}
```

```dart title="lib/src/pages/home_page.dart"
// lib/src/pages/home_page.dart

import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Flutter Demo"),
      ),
      body: const Center(child: Text("Flutter Demo")),
    );
  }
}
```

```dart title="lib/main.dart"
// lib/main.dart

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'src/app.dart';

void main() {
  runApp(const ProviderScope(child: App()));
}
```

As you can see, there's a new widget in our `main.dart` called `ProviderScope`. It's a must-have widget that wraps our `App` to make `Riverpod` work correctly.

At this point, even though our `lib/src/apis.dart` is still empty, it's a good idea to get your simulator or a real device ready for debugging and run `flutter run` to make sure everything is set up correctly. If the app starts without any issues, then we're ready to move on and work on the `apis.dart` file to write the code for getting some data from open-source APIs. In this case, we'll use [reqres.](https://reqres.in)

Before we write code to fetch data, we need to create a model that can convert JSON into a Dart class, let's create a new fill inside `models` folder called `user.dart` because we're going to fetch a list of users. Below is the code you can copy and paste:

```dart title="lib/src/models/user.dart"
// lib/src/models/user.dart

import 'package:freezed_annotation/freezed_annotation.dart';

part 'user.freezed.dart';
part 'user.g.dart';

@freezed
class User with _$User {
  const factory User({
    required int id,
    required String email,
    @JsonKey(name: 'first_name') required String firstName,
    @JsonKey(name: 'last_name') required String lastName,
    required String avatar,
  }) = _User;

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
}
```

Don't get scared by all the red warnings, everything is going to be okay after we run `flutter_scripts run` to generate some files.

Run a `flutter_script run` in your terminal and choose the build option with your arrow keys and hit enter.

```bash
flutter_scripts run
```

After we have a user model, let's update the `lib/src/apis.dart`. Here's the code to fetch data, you can copy and paste it:

```dart title="lib/src/apis.dart"
// lib/src/apis.dart

import 'dart:convert';

import 'package:http/http.dart' as http;

import '../src/models/user.dart';

const kBaseUrl = 'https://reqres.in';

Future<List<User>> getUsers() async {
  try {
    final url = Uri.parse('$kBaseUrl/api/users?page=2');
    final res = await http.get(url);

    final data = json.decode(res.body);

    return (data['data'] as List).map((e) => User.fromJson(e)).toList();
  } catch (e) {
    throw Exception(e);
  }
}
```

To utilize Riverpod, we are now going to create a provider that we can use as an async state and display the data on a page. Here's the code to declare a provider, you can copy and paste it:

```dart title="lib/src/providers.dart"
// lib/src/providers.dart

import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../models/user.dart';
import '../apis.dart';

part 'providers.g.dart';

@riverpod
Future<List<User>> users(UsersRef ref) async {
  final users = await getUsers();
  return users;
}
```

Once again, run `flutter_scripts run` to generate files and fix all the red warnings.

And finally, the last thing to do before we see some UI on our Flutter app. We're going to update our `home_page.dart` to finally consume the provider that we created recently. Update the `lib/src/pages/home_page.dart` with the code below:

```dart title="lib/src/pages/home_page.dart"
// lib/src/pages/home_page.dart

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../providers/providers.dart';

class HomePage extends ConsumerWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    var users = ref.watch(usersProvider);
    return Scaffold(
      appBar: AppBar(
        title: const Text("Flutter Demo"),
      ),
      body: users.when(
        data: (data) => ListView.separated(
          itemBuilder: (context, index) {
            final name = '${data[index].firstName} ${data[index].lastName}';
            final url = data[index].avatar;

            return ListTile(
              onTap: () {},
              leading: CircleAvatar(backgroundImage: NetworkImage(url)),
              title: Text(name),
              subtitle: Text(data[index].email),
            );
          },
          separatorBuilder: (_, __) => const Divider(height: 0.0),
          itemCount: data.length,
        ),
        error: (_, __) => const Center(child: Text('Failed to load')),
        loading: () => const Center(child: CircularProgressIndicator()),
      ),
    );
  }
}
```

That's pretty much it. You can run `flutter run` again to see the UI in the Flutter app. I hope you notice how much work is reduced. I encourage you to visit my repository that implements exactly this kind of method, but with more features such as multi-languages, theme switching, and a few unit tests that you can see on [riverpod_demo.](https://github.com/mirhasalh/riverpod_demo/tree/main)

Happy coding!