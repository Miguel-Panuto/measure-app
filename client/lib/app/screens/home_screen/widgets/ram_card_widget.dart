import 'package:client/app/providers/pc_provider.dart';
import 'package:client/app/screens/home_screen/widgets/line_widget.dart';
import 'package:client/app/screens/home_screen/widgets/title_piece_widget.dart';
import 'package:client/utils/app_routes.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class RamCardWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final rams = Provider.of<PcProvider>(context).rams;
    final count = Provider.of<PcProvider>(context).ramsCount;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
      child: Card(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          mainAxisSize: MainAxisSize.max,
          children: <Widget>[
            TitlePieceWidget(title: 'RAMS'),
            ListView.builder(
              itemCount: count,
              shrinkWrap: true,
              physics: NeverScrollableScrollPhysics(),
              itemBuilder: (ctx, i) => Column(
                children: <Widget>[
                  Container(
                    margin: const EdgeInsets.only(top: 10),
                    child: Text(
                      'RAM: ${i + 1}',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 16,
                      ),
                    ),
                  ),
                  LineWidget(label: 'Clock', value: '${rams[i].clock} MHz'),
                  LineWidget(
                    label: 'Tamanho',
                    value:
                        '${(rams[i].size / 1000000000).toStringAsFixed(2)} GB',
                  ),
                ],
              ),
            ),
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
                      Navigator.of(context).pushNamed(AppRoutes.CHART_RAM);
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
