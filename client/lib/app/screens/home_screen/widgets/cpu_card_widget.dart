import 'package:client/app/models/cpu_model.dart';
import 'package:client/app/providers/pc_provider.dart';
import 'package:client/app/screens/home_screen/widgets/line_widget.dart';
import 'package:client/app/screens/home_screen/widgets/title_piece_widget.dart';
import 'package:client/utils/app_routes.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class CpuCardWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final Cpu cpu = Provider.of<PcProvider>(context).cpu;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
      child: Card(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: <Widget>[
            TitlePieceWidget(title: 'CPU'),
            LineWidget(label: 'Marca', value: cpu.manufacturer),
            LineWidget(label: 'Modelo', value: cpu.brand),
            LineWidget(label: 'Velocidade', value: '${cpu.speed}GHz'),
            LineWidget(label: 'Núcleos', value: cpu.cores.toString()),
            LineWidget(
                label: 'Núcleos físicos', value: cpu.physicalCores.toString()),
            LineWidget(label: 'Socket', value: cpu.socket),
            Row(
              children: <Widget>[
                Expanded(
                    child: Container(
                  width: double.infinity,
                )),
                Container(
                  margin: const EdgeInsets.all(10),
                  child: FlatButton.icon(
                    onPressed: () {
                      Navigator.of(context).pushNamed(AppRoutes.CHART_CPU);
                    },
                    icon: Icon(Icons.show_chart),
                    label: Text('Abrir Gráficos'),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(15),
                    ),
                    color: Theme.of(context).primaryColor,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
