import 'dart:async' show Future, Timer;

import 'package:client/app/providers/pc_provider.dart';
import 'package:client/utils/app_routes.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class ChartRamScreen extends StatefulWidget {
  @override
  _ChartRamScreenState createState() => _ChartRamScreenState();
}

class _ChartRamScreenState extends State<ChartRamScreen> {
  LineChartBarData ramUsage;
  bool isLoading = true;
  final startTime = DateTime.now();

  @override
  void initState() {
    super.initState();
    final pcProvider = Provider.of<PcProvider>(context, listen: false);
    initUsages(pcProvider).then((_) {
      setState(() {
        isLoading = false;
      });
      attUsages(pcProvider);
    }).catchError(
      (_) => Navigator.of(context).pushReplacementNamed(AppRoutes.MAIN),
    );
  }

  Future<void> initUsages(PcProvider pcProvider) async {
    var actualTime = DateTime.now().difference(startTime);
    final _cpuUsage = await pcProvider.getRamUsage();

    ramUsage = LineChartBarData(
      colors: [Theme.of(context).primaryColor],
      isCurved: true,
      barWidth: 2,
      isStrokeCapRound: true,
      dotData: FlDotData(
        show: true,
        getDotPainter: (spot, percent, barData, index) => FlDotCirclePainter(
          radius: 2,
          color: Theme.of(context).accentColor,
        ),
      ),
      belowBarData: BarAreaData(
        show: false,
      ),
      spots: [
        FlSpot(actualTime.inSeconds.toDouble(), _cpuUsage),
      ],
    );

    return Future.value(_cpuUsage);
  }

  void attUsages(PcProvider pcProvider) {
    Timer.periodic(const Duration(seconds: 1), (timer) async {
      final actualTime = DateTime.now().difference(startTime);
      final _cpuUsage = await pcProvider.getRamUsage();

      if (ramUsage.spots.length > 10) {
        ramUsage.spots.removeAt(0);
      }

      setState(() {
        ramUsage.spots.add(FlSpot(actualTime.inSeconds.toDouble(), _cpuUsage));
      });
    });
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('RAM'),
        backgroundColor: Colors.grey[850],
      ),
      body: isLoading
          ? Center(
              child: CircularProgressIndicator(),
            )
          : Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.all(
                  Radius.circular(10),
                ),
                border: Border.all(
                  color: Theme.of(context).accentColor,
                  width: 2,
                ),
              ),
              padding: const EdgeInsets.only(
                  right: 18.0, left: 12.0, top: 24, bottom: 12),
              margin: const EdgeInsets.symmetric(
                vertical: 10,
                horizontal: 20,
              ),
              width: double.infinity,
              height: double.infinity,
              child: LineChart(
                LineChartData(
                  lineBarsData: [ramUsage],
                  minY: 0,
                  maxY: 100,
                  clipData: FlClipData.all(),
                  gridData: FlGridData(
                    show: true,
                    getDrawingHorizontalLine: (value) => FlLine(
                      color: Colors.black12,
                      strokeWidth: 2,
                    ),
                  ),
                  titlesData: FlTitlesData(
                    show: true,
                    bottomTitles: SideTitles(
                      showTitles: false,
                    ),
                    leftTitles: SideTitles(
                      showTitles: true,
                      getTextStyles: (value) => const TextStyle(
                        color: Color(0xff67727d),
                        fontWeight: FontWeight.bold,
                        fontSize: 12,
                      ),
                      getTitles: (value) {
                        switch (value.toInt()) {
                          case 0:
                            return '0%';
                          case 10:
                            return '10%';
                          case 20:
                            return '20%';
                          case 30:
                            return '30%';
                          case 40:
                            return '40%';
                          case 50:
                            return '50%';
                          case 60:
                            return '60%';
                          case 70:
                            return '70%';
                          case 80:
                            return '80%';
                          case 90:
                            return '90%';
                          case 100:
                            return '100%';
                        }
                        return '';
                      },
                      reservedSize: 30,
                      margin: 10,
                    ),
                  ),
                  borderData: FlBorderData(
                    show: true,
                    border: const Border(
                      bottom: BorderSide(
                        color: Colors.transparent,
                      ),
                      left: BorderSide(
                        color: Color(0xff4e4965),
                        width: 4,
                      ),
                      right: BorderSide(
                        color: Colors.transparent,
                      ),
                      top: BorderSide(
                        color: Colors.transparent,
                      ),
                    ),
                  ),
                ),
              ),
            ),
    );
  }
}
