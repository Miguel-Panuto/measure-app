import 'package:client/app/providers/pc_provider.dart';
import 'package:client/app/screens/chart_cpu_screen/chart_cpu_screen.dart';
import 'package:client/app/screens/chart_ram_screen/chart_ram_screen.dart';
import 'package:client/app/screens/home_screen/home_screen.dart';
import 'package:client/app/screens/main_screen/main_screen.dart';
import 'package:client/utils/app_routes.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(
          create: (_) => PcProvider(),
        ),
      ],
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          primarySwatch: Colors.purple,
          primaryColor: Colors.purple,
          accentColor: Colors.amber,
          visualDensity: VisualDensity.adaptivePlatformDensity,
          brightness: Brightness.dark,
        ),
        routes: {
          AppRoutes.MAIN: (ctx) => MainScreen(),
          AppRoutes.HOME: (ctx) => HomeScreen(),
          AppRoutes.CHART_CPU: (ctx) => ChartCpuScreen(),
          AppRoutes.CHART_RAM: (ctx) => ChartRamScreen(),
        },
      ),
    );
  }
}
