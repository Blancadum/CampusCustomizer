import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './EntEac2Workbench.css';

/**
 * ============================================================================
 * @component   EntEac2Workbench
 * @description Entorn de Treball Integral per a la EAC 2 d'Entorns de Desenvolupament (ENT).
 *              Mòdul 0487 · Curs 2026-27 · Blanca de Uña Martín
 * 
 *              Inclou:
 *              - Mode 1: Panell de Tasques & Taller Executable (Checklist, Simulador
 *                        interactiu de Swing, Codi Font Java, Taller Spring i Copilot)
 *              - Mode 2: Memòria Oficial de Lliurament (Format fidel a l'enunciat oficial)
 * ============================================================================
 */

export const TEST_QUESTIONS = [
  {
    num: 1,
    question: "Quina és la tasca d’un programador informàtic?",
    options: [
      { key: 'a', text: "Escollir quines ordres formen el programa, en quin ordre s’executen i sobre quines dades s’apliquen", correct: true },
      { key: 'b', text: "Fabricar el maquinari on s’executarà el programa", correct: false },
      { key: 'c', text: "Només corregir errors del sistema operatiu", correct: false },
      { key: 'd', text: "Exclusivament dissenyar les interfícies gràfiques", correct: false }
    ],
    justification: "El programador tradueix els requeriments i algoritmes en instruccions precises que un ordinador pugui executar sobre dades concretes."
  },
  {
    num: 2,
    question: "Què és el codi font?",
    options: [
      { key: 'a', text: "El conjunt de fitxers de text que contenen les instruccions del programa escrites en un llenguatge de programació", correct: true },
      { key: 'b', text: "El fitxer binari que executa directament el processador", correct: false },
      { key: 'c', text: "El resultat de la tasca de l’enllaçador", correct: false },
      { key: 'd', text: "Una col·lecció de codi predefinit", correct: false }
    ],
    justification: "El codi font són fitxers de text pla editables per humans que després són compilats o interpretats."
  },
  {
    num: 3,
    question: "Amb quin objectiu va sorgir el concepte de màquina virtual?",
    options: [
      { key: 'a', text: "Augmentar la velocitat d’execució dels intèrprets", correct: false },
      { key: 'b', text: "Eliminar la necessitat d’escriure codi font", correct: false },
      { key: 'c', text: "Facilitar el desenvolupament de compiladors que generin codi per a diferents processadors", correct: true },
      { key: 'd', text: "Substituir el sistema operatiu", correct: false }
    ],
    justification: "La màquina virtual (com la JVM) ofereix una capa d'abstracció (bytecode) que permet executar el mateix programa en qualsevol arquitectura de processador."
  },
  {
    num: 4,
    question: "Quin és un dels inconvenients dels llenguatges de baix nivell (primera i segona generació)?",
    options: [
      { key: 'a', text: "No permeten optimitzar els programes", correct: false },
      { key: 'b', text: "Els programes estan lligats al maquinari i no es poden traslladar fàcilment a altres sistemes", correct: true },
      { key: 'c', text: "Són massa abstractes per al programador", correct: false },
      { key: 'd', text: "Només funcionen amb bases de dades", correct: false }
    ],
    justification: "Els llenguatges màquina i d'assemblador depenen estretament dels jocs d'instruccions i registres físics de la CPU concreta."
  },
  {
    num: 5,
    question: "Quina d’aquestes és la classificació de paradigmes de programació?",
    options: [
      { key: 'a', text: "Compilat, interpretat, virtual i natiu", correct: false },
      { key: 'b', text: "Baix nivell, mig nivell i alt nivell", correct: false },
      { key: 'c', text: "Seqüencial, concurrent, paral·lel i distribuït", correct: false },
      { key: 'd', text: "Imperatiu/estructurat, d’objectes, funcional i lògic", correct: true }
    ],
    justification: "Són els quatre grans enfocaments filosòfics i estructurals per modelar la computació."
  },
  {
    num: 6,
    question: "Qui va desenvolupar la programació estructurada i què considera innecessari?",
    options: [
      { key: 'a', text: "Alan Turing; l’ús de bucles", correct: false },
      { key: 'b', text: "Edsger W. Dijkstra; l’ús d’instruccions de transferència incondicional com GOTO", correct: true },
      { key: 'c', text: "Bjarne Stroustrup; l’ús de classes", correct: false },
      { key: 'd', text: "John McCarthy; l’ús de funcions", correct: false }
    ],
    justification: "Dijkstra va publicar el famós article 'Go To Statement Considered Harmful' (1968), promovent estructures de seqüència, selecció i iteració."
  },
  {
    num: 7,
    question: "Què és un objecte en la programació orientada a objectes?",
    options: [
      { key: 'a', text: "Un fitxer de codi font", correct: false },
      { key: 'b', text: "Una funció que retorna un únic valor", correct: false },
      { key: 'c', text: "Un tipus de dades bàsic", correct: false },
      { key: 'd', text: "Una combinació de dades (atributs) i mètodes que permeten interactuar-hi.", correct: true }
    ],
    justification: "Un objecte encapsula un estat intern (camps) i un comportament exposat (mètodes)."
  },
  {
    num: 8,
    question: "Quins són els 5 conceptes en què es basa la programació orientada a objectes?",
    options: [
      { key: 'a', text: "Seqüència, selecció, iteració, modularitat i herència", correct: false },
      { key: 'b', text: "Abstracció, encapsulació, modularitat, jerarquia i polimorfisme", correct: true },
      { key: 'c', text: "Classe, objecte, atribut, mètode i constructor", correct: false },
      { key: 'd', text: "Compilació, enllaç, interpretació, execució i depuració", correct: false }
    ],
    justification: "Definits per Grady Booch i els fonaments de l'enginyeria de software orientada a objectes."
  },
  {
    num: 9,
    question: "En què consisteix la sobrecàrrega (overload) de mètodes?",
    options: [
      { key: 'a', text: "Implementar diverses vegades un mateix mètode amb paràmetres diferents; el compilador decideix quin executar segons la crida", correct: true },
      { key: 'b', text: "Reimplementar un mètode heretat amb exactament la mateixa definició", correct: false },
      { key: 'c', text: "Declarar un mètode com a privat", correct: false },
      { key: 'd', text: "Copiar i enganxar codi en diverses classes", correct: false }
    ],
    justification: "L'overload permet que una classe tingui múltiples mètodes amb el mateix identificador però signatura diferent (nombre o tipus d'arguments)."
  },
  {
    num: 10,
    question: "En què consisteix la sobreescriptura (override) de mètodes?",
    options: [
      { key: 'a', text: "Definir el mateix nom de mètode amb paràmetres diferents", correct: false },
      { key: 'b', text: "Eliminar un mètode de la superclasse", correct: false },
      { key: 'c', text: "Reimplementar un mètode heretat d’una superclasse amb exactament la mateixa definició (nom, paràmetres i valor de retorn)", correct: true },
      { key: 'd', text: "Convertir un mètode públic en privat", correct: false }
    ],
    justification: "L'override (@Override a Java) permet a una subclasse proporcionar una implementació específica d'un mètode ja definit a la seva superclasse."
  }
];

export const JAVA_SWING_CODE = `package cat.ioc.volei;

import java.awt.EventQueue;
import java.awt.Color;
import java.awt.Font;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;
import javax.swing.border.TitledBorder;
import javax.swing.border.EtchedBorder;
import javax.swing.JLabel;
import javax.swing.JTextField;
import javax.swing.JComboBox;
import javax.swing.DefaultComboBoxModel;
import javax.swing.JButton;
import javax.swing.SwingConstants;

/**
 * ============================================================================
 * EAC2 - Mòdul 0487 Entorns de Desenvolupament (IOC 2026-27)
 * Activitat 11: Simulador de Quota Anual d'un Soci de Club de Volei
 * Alumna: Blanca de Uña Martín (Cognom al títol: "deUna")
 * ============================================================================
 */
public class ClubVoleiFrame extends JFrame {

    private static final long serialVersionUID = 1L;
    private JPanel contentPane;

    // Bloc 1: Dades Soci
    private JPanel panelDadesSoci;
    private JTextField txtEdat;
    private JComboBox<String> comboCategoria;
    private JComboBox<String> comboTipusSoci;
    private JButton btnValidar;

    // Bloc 2: Opcions i Serveis
    private JPanel panelOpcionsServeis;
    private JComboBox<String> comboModalitat;
    private JComboBox<String> comboEquipacio;
    private JTextField txtDonacio;
    private JButton btnCalcular;
    private JButton btnEsborrarTot;

    // Bloc 3: Resultats
    private JTextField txtPreuBase;
    private JTextField txtIva;
    private JTextField txtTotal;

    // Bloc 4: Errors i Alertes
    private JTextField txtErrorsAlertes;

    public static void main(String[] args) {
        EventQueue.invokeLater(new Runnable() {
            public void run() {
                try {
                    ClubVoleiFrame frame = new ClubVoleiFrame();
                    frame.setVisible(true);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    public ClubVoleiFrame() {
        setTitle("Simulador Quota Club Volei - deUna");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setBounds(100, 100, 720, 520);
        setResizable(false);
        setLocationRelativeTo(null);

        contentPane = new JPanel();
        contentPane.setBorder(new EmptyBorder(10, 10, 10, 10));
        setContentPane(contentPane);
        contentPane.setLayout(null);

        // ====================================================================
        // BLOC 1: DADES SOCI (SUPERIOR ESQUERRA)
        // ====================================================================
        panelDadesSoci = new JPanel();
        panelDadesSoci.setBorder(new TitledBorder(new EtchedBorder(), "Dades Soci", TitledBorder.LEADING, TitledBorder.TOP, null, new Color(30, 41, 59)));
        panelDadesSoci.setBounds(15, 15, 330, 215);
        panelDadesSoci.setLayout(null);
        contentPane.add(panelDadesSoci);

        JLabel lblEdat = new JLabel("Edat del soci (6 - 99):");
        lblEdat.setBounds(15, 25, 160, 20);
        panelDadesSoci.add(lblEdat);

        txtEdat = new JTextField();
        txtEdat.setToolTipText("Introduïu l'edat del soci (enter positiu entre 6 i 99 anys).");
        txtEdat.setBounds(15, 45, 300, 26);
        panelDadesSoci.add(txtEdat);

        JLabel lblCategoria = new JLabel("Categoria / Nivell:");
        lblCategoria.setBounds(15, 75, 160, 20);
        panelDadesSoci.add(lblCategoria);

        comboCategoria = new JComboBox<String>();
        comboCategoria.setToolTipText("Seleccioneu la categoria del soci.");
        comboCategoria.setModel(new DefaultComboBoxModel<String>(new String[] {
            "-- Seleccioneu Categoria --", 
            "Escolar", 
            "Base", 
            "Sènior", 
            "Master"
        }));
        comboCategoria.setBounds(15, 95, 300, 26);
        panelDadesSoci.add(comboCategoria);

        JLabel lblTipusSoci = new JLabel("Tipus de Soci:");
        lblTipusSoci.setBounds(15, 125, 160, 20);
        panelDadesSoci.add(lblTipusSoci);

        comboTipusSoci = new JComboBox<String>();
        comboTipusSoci.setToolTipText("Seleccioneu el tipus de soci.");
        comboTipusSoci.setModel(new DefaultComboBoxModel<String>(new String[] {
            "-- Seleccioneu Tipus de Soci --", 
            "Soci Jugador", 
            "Soci Familiar", 
            "Soci Simpatitzant"
        }));
        comboTipusSoci.setBounds(15, 145, 300, 26);
        panelDadesSoci.add(comboTipusSoci);

        btnValidar = new JButton("VALIDAR");
        btnValidar.setBounds(15, 178, 300, 28);
        panelDadesSoci.add(btnValidar);

        // ====================================================================
        // BLOC 2: OPCIONS I SERVEIS (SUPERIOR DRETA)
        // ====================================================================
        panelOpcionsServeis = new JPanel();
        panelOpcionsServeis.setBorder(new TitledBorder(new EtchedBorder(), "Opcions i Serveis", TitledBorder.LEADING, TitledBorder.TOP, null, new Color(30, 41, 59)));
        panelOpcionsServeis.setBounds(360, 15, 330, 215);
        panelOpcionsServeis.setLayout(null);
        contentPane.add(panelOpcionsServeis);

        JLabel lblModalitat = new JLabel("Modalitat de joc:");
        lblModalitat.setBounds(15, 20, 160, 18);
        panelOpcionsServeis.add(lblModalitat);

        comboModalitat = new JComboBox<String>();
        comboModalitat.setToolTipText("Trieu la modalitat de joc desitjada.");
        comboModalitat.setModel(new DefaultComboBoxModel<String>(new String[] {
            "-- Seleccioneu Modalitat --",
            "Només Pista",
            "Només Volei Platja",
            "Ambdós"
        }));
        comboModalitat.setBounds(15, 38, 300, 24);
        panelOpcionsServeis.add(comboModalitat);

        JLabel lblEquipacio = new JLabel("Equipació oficial completa:");
        lblEquipacio.setBounds(15, 66, 200, 18);
        panelOpcionsServeis.add(lblEquipacio);

        comboEquipacio = new JComboBox<String>();
        comboEquipacio.setToolTipText("Indiqueu si desitja adquirir l'equipació oficial (SÍ/NO).");
        comboEquipacio.setModel(new DefaultComboBoxModel<String>(new String[] {
            "-- Voleu Equipació? --",
            "SÍ",
            "NO"
        }));
        comboEquipacio.setBounds(15, 84, 300, 24);
        panelOpcionsServeis.add(comboEquipacio);

        JLabel lblDonacio = new JLabel("Aportació / Donació (€):");
        lblDonacio.setBounds(15, 112, 200, 18);
        panelOpcionsServeis.add(lblDonacio);

        txtDonacio = new JTextField();
        txtDonacio.setText("0");
        txtDonacio.setToolTipText("Quantitat voluntària en euros (0 si no desitja donar).");
        txtDonacio.setBounds(15, 130, 300, 24);
        panelOpcionsServeis.add(txtDonacio);

        btnCalcular = new JButton("CALCULAR");
        btnCalcular.setBounds(15, 168, 145, 34);
        panelOpcionsServeis.add(btnCalcular);

        btnEsborrarTot = new JButton("ESBORRAR TOT");
        btnEsborrarTot.setBounds(170, 168, 145, 34);
        panelOpcionsServeis.add(btnEsborrarTot);

        // ====================================================================
        // BLOC 3: RESULTATS (INFERIOR ESQUERRA)
        // ====================================================================
        JPanel panelResultats = new JPanel();
        panelResultats.setBorder(new TitledBorder(new EtchedBorder(), "Resultats", TitledBorder.LEADING, TitledBorder.TOP, null, new Color(30, 41, 59)));
        panelResultats.setBounds(15, 238, 330, 140);
        panelResultats.setLayout(null);
        contentPane.add(panelResultats);

        JLabel lblPreuBase = new JLabel("Preu Base (€):");
        lblPreuBase.setBounds(15, 25, 120, 20);
        panelResultats.add(lblPreuBase);

        txtPreuBase = new JTextField();
        txtPreuBase.setEditable(false);
        txtPreuBase.setHorizontalAlignment(SwingConstants.RIGHT);
        txtPreuBase.setBounds(140, 22, 175, 26);
        panelResultats.add(txtPreuBase);

        JLabel lblIva = new JLabel("IVA (21%) (€):");
        lblIva.setBounds(15, 60, 120, 20);
        panelResultats.add(lblIva);

        txtIva = new JTextField();
        txtIva.setEditable(false);
        txtIva.setHorizontalAlignment(SwingConstants.RIGHT);
        txtIva.setBounds(140, 57, 175, 26);
        panelResultats.add(txtIva);

        JLabel lblTotal = new JLabel("TOTAL (€):");
        lblTotal.setFont(new Font("Segoe UI", Font.BOLD, 13));
        lblTotal.setBounds(15, 95, 120, 20);
        panelResultats.add(lblTotal);

        txtTotal = new JTextField();
        txtTotal.setEditable(false);
        txtTotal.setFont(new Font("Segoe UI", Font.BOLD, 13));
        txtTotal.setHorizontalAlignment(SwingConstants.RIGHT);
        txtTotal.setBounds(140, 92, 175, 26);
        panelResultats.add(txtTotal);

        // ====================================================================
        // BLOC 4: ERRORS I ALERTES (INFERIOR DRETA)
        // ====================================================================
        JPanel panelAlertes = new JPanel();
        panelAlertes.setBorder(new TitledBorder(new EtchedBorder(), "Errors i Alertes", TitledBorder.LEADING, TitledBorder.TOP, null, new Color(30, 41, 59)));
        panelAlertes.setBounds(360, 238, 330, 140);
        panelAlertes.setLayout(null);
        contentPane.add(panelAlertes);

        txtErrorsAlertes = new JTextField();
        txtErrorsAlertes.setEditable(false);
        txtErrorsAlertes.setFont(new Font("Segoe UI", Font.BOLD, 12));
        txtErrorsAlertes.setForeground(new Color(185, 28, 28));
        txtErrorsAlertes.setBounds(15, 30, 300, 85);
        panelAlertes.add(txtErrorsAlertes);

        // Estat inicial: Bloc 2 desactivat
        setEstatInicial();

        // ====================================================================
        // GESTIÓ D'EVENTS: BOTÓ VALIDAR
        // ====================================================================
        btnValidar.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                txtErrorsAlertes.setText("");
                String strEdat = txtEdat.getText().trim();

                if (strEdat.isEmpty()) {
                    notificarError(txtEdat, "Error: L'edat és obligatòria. Introduïu un valor enter.");
                    return;
                }

                int edat = -1;
                try {
                    edat = Integer.parseInt(strEdat);
                } catch (NumberFormatException ex) {
                    notificarError(txtEdat, "Error: Format incorrecte. L'edat ha de ser un nombre enter.");
                    return;
                }

                if (edat < 6 || edat > 99) {
                    notificarError(txtEdat, "Error: L'edat ha d'estar compresa entre 6 i 99 anys (ambdós inclosos).");
                    return;
                }

                if (comboCategoria.getSelectedIndex() <= 0) {
                    comboCategoria.requestFocus();
                    txtErrorsAlertes.setText("Error: Heu de seleccionar una Categoria / Nivell vàlida.");
                    return;
                }

                if (comboTipusSoci.getSelectedIndex() <= 0) {
                    comboTipusSoci.requestFocus();
                    txtErrorsAlertes.setText("Error: Heu de seleccionar un Tipus de Soci vàlid.");
                    return;
                }

                // Si tot és correcte: deshabilitar bloc 1 i habilitar bloc 2
                txtEdat.setEnabled(false);
                comboCategoria.setEnabled(false);
                comboTipusSoci.setEnabled(false);
                btnValidar.setEnabled(false);

                comboModalitat.setEnabled(true);
                comboEquipacio.setEnabled(true);
                txtDonacio.setEnabled(true);
                btnCalcular.setEnabled(true);
                btnEsborrarTot.setEnabled(true);

                txtErrorsAlertes.setText("✓ Dades del soci validades correctament. Configureu les opcions.");
                comboModalitat.requestFocus();
            }
        });

        // ====================================================================
        // GESTIÓ D'EVENTS: BOTÓ CALCULAR
        // ====================================================================
        btnCalcular.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                txtErrorsAlertes.setText("");

                if (comboModalitat.getSelectedIndex() <= 0) {
                    comboModalitat.requestFocus();
                    txtErrorsAlertes.setText("Error: Seleccioneu una Modalitat de joc.");
                    return;
                }

                if (comboEquipacio.getSelectedIndex() <= 0) {
                    comboEquipacio.requestFocus();
                    txtErrorsAlertes.setText("Error: Indiqueu si voleu l'equipació oficial (SÍ/NO).");
                    return;
                }

                String strDonacio = txtDonacio.getText().trim();
                double donacio = 0.0;
                try {
                    donacio = Double.parseDouble(strDonacio);
                    if (donacio < 0) {
                        notificarError(txtDonacio, "Error: L'aportació / donació ha de ser un import igual o superior a 0.");
                        return;
                    }
                } catch (NumberFormatException ex) {
                    notificarError(txtDonacio, "Error: Format incorrecte a la donació. Introduïu un valor numèric vàlid.");
                    return;
                }

                // Càlcul de la Quota Base segons Categoria
                double quotaBaseCategoria = 0.0;
                String cat = (String) comboCategoria.getSelectedItem();
                if ("Escolar".equals(cat)) quotaBaseCategoria = 250.0;
                else if ("Base".equals(cat)) quotaBaseCategoria = 400.0;
                else if ("Sènior".equals(cat)) quotaBaseCategoria = 500.0;
                else if ("Master".equals(cat)) quotaBaseCategoria = 600.0;

                // Factor segons Tipus de Soci
                double factorSoci = 1.0;
                String tipus = (String) comboTipusSoci.getSelectedItem();
                if ("Soci Jugador".equals(tipus)) factorSoci = 1.00;
                else if ("Soci Familiar".equals(tipus)) factorSoci = 0.85;
                else if ("Soci Simpatitzant".equals(tipus)) factorSoci = 0.60;

                // Suplements de Serveis
                double suplementModalitat = 0.0;
                String mod = (String) comboModalitat.getSelectedItem();
                if ("Ambdós".equals(mod)) suplementModalitat = 120.0;

                double suplementEquipacio = 0.0;
                String eq = (String) comboEquipacio.getSelectedItem();
                if ("SÍ".equals(eq)) suplementEquipacio = 95.0;

                // Fórmules oficials
                double preuBase = (quotaBaseCategoria * factorSoci) + suplementModalitat + suplementEquipacio + donacio;
                double iva21 = preuBase * 0.21;
                double total = preuBase + iva21;

                // Mostrar resultats formatats a 2 decimals
                txtPreuBase.setText(String.format("%.2f €", preuBase));
                txtIva.setText(String.format("%.2f €", iva21));
                txtTotal.setText(String.format("%.2f €", total));

                txtErrorsAlertes.setText("✓ Càlcul completat amb èxit. TOTAL: " + String.format("%.2f €", total));
            }
        });

        // ====================================================================
        // GESTIÓ D'EVENTS: BOTÓ ESBORRAR TOT
        // ====================================================================
        btnEsborrarTot.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                setEstatInicial();
                txtEdat.requestFocus();
            }
        });
    }

    private void notificarError(JTextField camp, String missatge) {
        camp.requestFocus();
        camp.selectAll();
        txtErrorsAlertes.setText(missatge);
    }

    private void setEstatInicial() {
        txtEdat.setEnabled(true);
        txtEdat.setText("");
        comboCategoria.setEnabled(true);
        comboCategoria.setSelectedIndex(0);
        comboTipusSoci.setEnabled(true);
        comboTipusSoci.setSelectedIndex(0);
        btnValidar.setEnabled(true);

        comboModalitat.setEnabled(false);
        comboModalitat.setSelectedIndex(0);
        comboEquipacio.setEnabled(false);
        comboEquipacio.setSelectedIndex(0);
        txtDonacio.setEnabled(false);
        txtDonacio.setText("0");
        btnCalcular.setEnabled(false);
        btnEsborrarTot.setEnabled(false);

        txtPreuBase.setText("");
        txtIva.setText("");
        txtTotal.setText("");
        txtErrorsAlertes.setText("");
    }
}`;

export const SPRING_CODE = `package com.exemple.web.servidor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * ============================================================================
 * EAC2 - Mòdul 0487 Entorns de Desenvolupament (IOC 2026-27)
 * Activitat 12: Aplicació Client-Servidor Spring a Tomcat
 * Alumna: Blanca de Uña Martín
 * DNI Requerit a sota del títol: Blanca de Uña Martín (DNI de l'alumna)
 * Operació: Quàdruple (x 4) del valor introduït
 * ============================================================================
 */
@RestController
public class Controlador {

    @GetMapping("/")
    public String index() {
        return "<html><head><meta charset='UTF-8'><title>Càlcul Quàdruple - Spring</title></head><body>"
             + "<h1>Calcula el quàdruple del valor</h1>"
             + "<p style='color:#2563eb; font-weight:bold;'>Alumna: Blanca de Uña Martín · DNI: 12345678Z (DNI fictici - Art. 5.1.c RGPD)</p>"
             + "<form action='/dobla' method='GET'>"
             + "<h3>Introdueix l'enter:</h3>"
             + "<input type='text' name='enter' style='padding:5px; font-size:16px;' />"
             + "<input type='submit' value='Enviar' style='padding:5px 12px; margin-left:8px;' />"
             + "</form>"
             + "</body></html>";
    }

    @GetMapping("/dobla")
    public String resultat(@RequestParam("enter") String enter) {
        try {
            int valor = Integer.parseInt(enter.trim());
            // REQUERIMENT EAC2: Calcular el QUÀDRUPLE (x 4) en lloc del doble
            int resultat = valor * 4;

            return "<html><head><meta charset='UTF-8'><title>Resultat Quàdruple - Spring</title></head><body>"
                 + "<h1>Calcula el quàdruple del valor</h1>"
                 + "<p style='color:#2563eb; font-weight:bold;'>Alumna: Blanca de Uña Martín · DNI: 12345678Z (DNI fictici - Art. 5.1.c RGPD)</p>"
                 + "<h2 style='color:#059669;'>Resultat: " + resultat + "</h2>"
                 + "<p>(Valor introduït: " + valor + " &times; 4 = " + resultat + ")</p>"
                 + "<br/><a href='/'>&larr; Tornar a introduir un altre número</a>"
                 + "</body></html>";

        } catch (NumberFormatException e) {
            return "<html><head><meta charset='UTF-8'><title>Error de Format</title></head><body>"
                 + "<h1>Calcula el quàdruple del valor</h1>"
                 + "<p style='color:#2563eb; font-weight:bold;'>Alumna: Blanca de Uña Martín · DNI: 12345678Z (DNI fictici - Art. 5.1.c RGPD)</p>"
                 + "<h2 style='color:#dc2626;'>El valor introdu&iuml;t no &eacute;s un enter vàlid</h2>"
                 + "<br/><a href='/'>&larr; Tornar a intentar-ho</a>"
                 + "</body></html>";
        }
    }
}`;

export const COPILOT_JAVA_CODE = `package cat.ioc.copilot;

/**
 * ============================================================================
 * EAC2 - Mòdul 0487 Entorns de Desenvolupament (IOC 2026-27)
 * Activitat 13: Exercici assistit amb GitHub Copilot
 * Alumna: Blanca de Uña Martín
 * ============================================================================
 */
public class CopilotAssistent {

    /*
     * MÈTODE 1: ocultarVocals(String text)
     * Objectiu: Rebre una cadena de text i retornar la mateixa cadena en la qual
     * totes les vocals (a, e, i, o, u), tant en minúscules com en majúscules,
     * així com les vocals amb accents gràfics o dièresi (à, è, é, í, ò, ó, ú, ï, ü)
     * hagin estat substituïdes per un asterisc (*).
     * 
     * Exemple: "Entorns de Desenvolupament" -> "*nt*rns d* D*s*nv*l*p*m*nt"
     */
    public static String ocultarVocals(String text) {
        if (text == null) {
            return null;
        }
        // Expressió regular que cobreix vocals simples, accentuades i amb dièresi
        return text.replaceAll("(?i)[aeiouàèéíòóúïü]", "*");
    }

    /*
     * MÈTODE 2: comptarParaules(String text)
     * Objectiu: Rebre una cadena de text i retornar el nombre de paraules
     * contingudes a la cadena, separades per un o més espais en blanc.
     * Gestiona cadenes buides o amb múltiples espais consecutius.
     * 
     * Exemple: "Entorns de Desenvolupament" -> 3 paraules
     */
    public static int comptarParaules(String text) {
        if (text == null || text.trim().isEmpty()) {
            return 0;
        }
        // Separem per un o més espais en blanc mitjançant l'expressió regular \\s+
        String[] paraules = text.trim().split("\\\\s+");
        return paraules.length;
    }

    public static void main(String[] args) {
        String prova = "Entorns de Desenvolupament";
        System.out.println("Original: " + prova);
        System.out.println("Vocals ocultes: " + ocultarVocals(prova));
        System.out.println("Nombre de paraules: " + comptarParaules(prova));
    }
}`;

export default function EntEac2Workbench() {
  const [activeMode, setActiveMode] = useState('tareas'); // 'tareas' | 'memoria'
  const [activePartId, setActivePartId] = useState('part-swing');
  const [copiedKey, setCopiedKey] = useState(null);
  const [folderToast, setFolderToast] = useState(null);
  const [copiedPath, setCopiedPath] = useState(false);

  const handleOpenFolder = () => {
    setFolderToast('Obrint la carpeta de resultats al Finder de macOS...');
    fetch('/api/open-folder?path=/Users/blanca/Micampus/public/eacs/ent/EAC2')
      .then((res) => res.json())
      .then(() => {
        setFolderToast('✅ Carpeta oberta al Finder! (/Users/blanca/Micampus/public/eacs/ent/EAC2)');
        setTimeout(() => setFolderToast(null), 4000);
      })
      .catch(() => {
        setFolderToast('⚠️ Error obrint al Finder. Ruta: /Users/blanca/Micampus/public/eacs/ent/EAC2');
        setTimeout(() => setFolderToast(null), 5000);
      });
  };

  const handleCopyPath = () => {
    navigator.clipboard.writeText('/Users/blanca/Micampus/public/eacs/ent/EAC2');
    setCopiedPath(true);
    setFolderToast('📋 Ruta copiada al porta-retalls: /Users/blanca/Micampus/public/eacs/ent/EAC2');
    setTimeout(() => {
      setCopiedPath(false);
      setFolderToast(null);
    }, 3500);
  };

  // ==========================================================================
  // ESTAT DEL SIMULADOR SWING EN VIU
  // ==========================================================================
  const [swingState, setSwingState] = useState({
    // Bloc 1: Dades Soci
    isBloc1Enabled: true,
    edat: '',
    categoria: '',
    tipusSoci: '',
    // Bloc 2: Opcions i Serveis
    isBloc2Enabled: false,
    modalitat: '',
    equipacio: '',
    donacio: '0',
    // Bloc 3: Resultats
    preuBase: '',
    iva: '',
    total: '',
    // Bloc 4: Errors i Alertes
    alertaText: '',
    alertaType: 'empty', // 'empty' | 'error' | 'success'
    hasEdatError: false,
    hasDonacioError: false
  });

  // Checklist de tasques
  const [completedTasks, setCompletedTasks] = useState(() => {
    try {
      const s = localStorage.getItem('ent_eac2_completed');
      return s ? JSON.parse(s) : {};
    } catch {
      return {};
    }
  });

  // Estat del test interactiu (Apartat 1)
  const [testAnswers, setTestAnswers] = useState(() => {
    try {
      const s = localStorage.getItem('ent_eac2_test_answers');
      return s ? JSON.parse(s) : {};
    } catch {
      return {};
    }
  });

  const toggleTask = useCallback((taskId) => {
    setCompletedTasks((prev) => {
      const updated = { ...prev, [taskId]: !prev[taskId] };
      try {
        localStorage.setItem('ent_eac2_completed', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  }, []);

  const handleAnswerSelect = (qNum, optionKey) => {
    const updated = { ...testAnswers, [qNum]: optionKey };
    setTestAnswers(updated);
    try {
      localStorage.setItem('ent_eac2_test_answers', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopy = (text, key) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  // Càlcul de nota del test (encerts * 0.2 - errors * 0.04)
  const testStats = useMemo(() => {
    let correct = 0;
    let wrong = 0;
    TEST_QUESTIONS.forEach((q) => {
      const sel = testAnswers[q.num];
      if (sel) {
        const opt = q.options.find((o) => o.key === sel);
        if (opt?.correct) correct++;
        else wrong++;
      }
    });
    const score = Math.max(0, +(correct * 0.2 - wrong * 0.04).toFixed(2));
    return { correct, wrong, score, total: TEST_QUESTIONS.length };
  }, [testAnswers]);

  // ==========================================================================
  // LÒGICA INTERACTIVA DEL SIMULADOR SWING
  // ==========================================================================
  const handleValidarSwing = () => {
    const rawEdat = swingState.edat.trim();
    if (!rawEdat) {
      setSwingState(prev => ({
        ...prev,
        hasEdatError: true,
        alertaType: 'error',
        alertaText: "Error: L'edat és obligatòria. Introduïu un valor enter."
      }));
      return;
    }

    const numEdat = Number(rawEdat);
    if (isNaN(numEdat) || !Number.isInteger(numEdat)) {
      setSwingState(prev => ({
        ...prev,
        hasEdatError: true,
        alertaType: 'error',
        alertaText: "Error: Format incorrecte. L'edat ha de ser un nombre enter."
      }));
      return;
    }

    if (numEdat < 6 || numEdat > 99) {
      setSwingState(prev => ({
        ...prev,
        hasEdatError: true,
        alertaType: 'error',
        alertaText: "Error: L'edat ha d'estar compresa entre 6 i 99 anys (ambdós inclosos)."
      }));
      return;
    }

    if (!swingState.categoria) {
      setSwingState(prev => ({
        ...prev,
        alertaType: 'error',
        alertaText: "Error: Heu de seleccionar una Categoria / Nivell vàlida."
      }));
      return;
    }

    if (!swingState.tipusSoci) {
      setSwingState(prev => ({
        ...prev,
        alertaType: 'error',
        alertaText: "Error: Heu de seleccionar un Tipus de Soci vàlid."
      }));
      return;
    }

    // Validació correcta: deshabilitar bloc 1 i habilitar bloc 2
    setSwingState(prev => ({
      ...prev,
      isBloc1Enabled: false,
      isBloc2Enabled: true,
      hasEdatError: false,
      alertaType: 'success',
      alertaText: "✓ Dades del soci validades correctament. Configureu les opcions de joc."
    }));
  };

  const handleCalcularSwing = () => {
    if (!swingState.modalitat) {
      setSwingState(prev => ({
        ...prev,
        alertaType: 'error',
        alertaText: "Error: Seleccioneu una Modalitat de joc."
      }));
      return;
    }

    if (!swingState.equipacio) {
      setSwingState(prev => ({
        ...prev,
        alertaType: 'error',
        alertaText: "Error: Indiqueu si voleu l'equipació oficial (SÍ/NO)."
      }));
      return;
    }

    const rawDonacio = swingState.donacio.trim();
    const numDonacio = Number(rawDonacio);
    if (isNaN(numDonacio) || numDonacio < 0) {
      setSwingState(prev => ({
        ...prev,
        hasDonacioError: true,
        alertaType: 'error',
        alertaText: "Error: L'aportació / donació ha de ser un import numèric igual o superior a 0."
      }));
      return;
    }

    // Quota Categoria
    let quota = 0;
    if (swingState.categoria === 'Escolar') quota = 250;
    else if (swingState.categoria === 'Base') quota = 400;
    else if (swingState.categoria === 'Sènior') quota = 500;
    else if (swingState.categoria === 'Master') quota = 600;

    // Factor Tipus de Soci
    let factor = 1.0;
    if (swingState.tipusSoci === 'Soci Jugador') factor = 1.0;
    else if (swingState.tipusSoci === 'Soci Familiar') factor = 0.85;
    else if (swingState.tipusSoci === 'Soci Simpatitzant') factor = 0.60;

    // Suplements
    const supMod = swingState.modalitat === 'Ambdós' ? 120 : 0;
    const supEq = swingState.equipacio === 'SÍ' ? 95 : 0;

    const base = quota * factor + supMod + supEq + numDonacio;
    const iva21 = base * 0.21;
    const total = base + iva21;

    setSwingState(prev => ({
      ...prev,
      hasDonacioError: false,
      preuBase: `${base.toFixed(2)} €`,
      iva: `${iva21.toFixed(2)} €`,
      total: `${total.toFixed(2)} €`,
      alertaType: 'success',
      alertaText: `✓ Càlcul completat amb èxit. TOTAL: ${total.toFixed(2)} €`
    }));
  };

  const handleEsborrarTotSwing = () => {
    setSwingState({
      isBloc1Enabled: true,
      edat: '',
      categoria: '',
      tipusSoci: '',
      isBloc2Enabled: false,
      modalitat: '',
      equipacio: '',
      donacio: '0',
      preuBase: '',
      iva: '',
      total: '',
      alertaText: '',
      alertaType: 'empty',
      hasEdatError: false,
      hasDonacioError: false
    });
  };

  return (
    <div className="ent-eac2-root">
      {/* HEADER STICKY */}
      <header className="ent-eac2-header">
        <div className="ent-eac2-header-left">
          <Link
            to="/ioc/ent"
            style={{
              color: '#475569',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 800,
              padding: '0.4rem 0.8rem',
              borderRadius: '7px',
              border: '1px solid #cbd5e1',
              background: '#f1f5f9',
            }}
          >
            ← Tornar a ENT
          </Link>
          <span className="ent-eac2-badge">ENT · EAC 2</span>
          <div className="ent-eac2-header-title">
            <h1>🛠️ EAC 2 Workbench: Swing, Spring & Copilot</h1>
            <p>Mòdul 0487 · Desenvolupament de programari · Entrega: 17/11/2026</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={handleOpenFolder}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              background: '#f8fafc',
              color: '#0f172a',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
            }}
            title="Abrir carpeta de resultados en macOS Finder"
          >
            📂 Abrir Carpeta (Finder)
          </button>

          {/* SELECTOR DE MODE */}
          <div className="ent-eac2-mode-pills">
            <button
              type="button"
              className={`ent-eac2-mode-btn ${activeMode === 'tareas' ? 'active' : ''}`}
              onClick={() => setActiveMode('tareas')}
            >
              <span>📋</span>
              <span>Modo Tareas (Opción 1)</span>
            </button>
            <button
              type="button"
              className={`ent-eac2-mode-btn ${activeMode === 'memoria' ? 'active' : ''}`}
              onClick={() => setActiveMode('memoria')}
            >
              <span>📄</span>
              <span>Modo Memoria Oficial (Opción 2)</span>
            </button>
          </div>
        </div>
      </header>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="ent-eac2-container">
        {/* BANNER PROMINENT: CARPETA DE RESULTATS EAC 2 */}
        <div className="ent-folder-banner">
          <div className="ent-folder-banner-left">
            <div className="ent-folder-banner-icon">📁</div>
            <div>
              <div className="ent-folder-banner-title">
                Carpeta de Resultats & Lliurables EAC 2
                <span className="ent-folder-banner-badge">Local macOS</span>
              </div>
              <div className="ent-folder-banner-path">
                <span>Ruta local:</span>
                <code>/Users/blanca/Micampus/public/eacs/ent/EAC2</code>
              </div>
            </div>
          </div>

          <div className="ent-folder-banner-actions">
            <button
              type="button"
              className="ent-folder-btn-primary"
              onClick={handleOpenFolder}
              title="Obrir directament la carpeta a macOS Finder"
            >
              📂 Obrir al Finder
            </button>

            <button
              type="button"
              className="ent-folder-btn-secondary"
              onClick={handleCopyPath}
              title="Copiar ruta absoluta al porta-retalls"
            >
              {copiedPath ? '✅ Copiada!' : '📋 Copiar Ruta'}
            </button>

            <a
              href="/eacs/ent/EAC2/exercici11.zip"
              download
              className="ent-folder-file-chip"
              title="Descarregar directament exercici11.zip"
            >
              📦 exercici11.zip
            </a>

            <a
              href="/eacs/ent/EAC2/src/cat/ioc/volei/ClubVoleiFrame.java"
              download
              className="ent-folder-file-chip"
              title="Descarregar codi font Java Swing"
            >
              ☕ ClubVoleiFrame.java
            </a>
          </div>
        </div>
        {activeMode === 'tareas' ? (
          /* =================================================================
             MODE TAREAS & TALLER EXECUTABLE (OPCIÓ 1)
             ================================================================= */
          <div>
            {/* Barra de Progrés de les 4 Parts */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.8rem',
              marginBottom: '0.9rem',
              padding: '0.65rem 1.1rem',
              background: '#ffffff',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ fontSize: '1.1rem' }}>📋</span>
                <span style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0f172a' }}>
                  Avenç de la EAC 2:
                </span>
                <span style={{
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  padding: '0.2rem 0.55rem',
                  borderRadius: '6px',
                  background: (completedTasks['part-test'] && completedTasks['part-swing'] && completedTasks['part-spring'] && completedTasks['part-copilot']) ? '#dcfce7' : '#eff6ff',
                  color: (completedTasks['part-test'] && completedTasks['part-swing'] && completedTasks['part-spring'] && completedTasks['part-copilot']) ? '#15803d' : '#2563eb'
                }}>
                  {[completedTasks['part-test'], completedTasks['part-swing'], completedTasks['part-spring'], completedTasks['part-copilot']].filter(Boolean).length} de 4 parts completades ({Math.round(([completedTasks['part-test'], completedTasks['part-swing'], completedTasks['part-spring'], completedTasks['part-copilot']].filter(Boolean).length / 4) * 100)}%)
                </span>
              </div>
              <div style={{ width: '180px', height: '8px', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                <div style={{
                  width: `${([completedTasks['part-test'], completedTasks['part-swing'], completedTasks['part-spring'], completedTasks['part-copilot']].filter(Boolean).length / 4) * 100}%`,
                  height: '100%',
                  background: [completedTasks['part-test'], completedTasks['part-swing'], completedTasks['part-spring'], completedTasks['part-copilot']].filter(Boolean).length === 4 ? '#22c55e' : 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>

            {/* Navegació de Parts de la EAC 2 */}
            <div className="ent-eac2-parts-nav">
              {/* APARTAT 1 */}
              <div
                className={`ent-eac2-part-card ${activePartId === 'part-test' ? 'active' : ''} ${completedTasks['part-test'] ? 'completed' : ''}`}
                onClick={() => setActivePartId('part-test')}
              >
                <div>
                  <div className="ent-eac2-part-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span className="ent-eac2-part-num">Apartat 1</span>
                      {completedTasks['part-test'] && (
                        <span style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 800 }}>✓ Fet</span>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span className="ent-eac2-part-score">2.0 punts</span>
                      <label
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          cursor: 'pointer',
                          padding: '0.15rem 0.45rem',
                          borderRadius: '5px',
                          background: completedTasks['part-test'] ? '#dcfce7' : '#f8fafc',
                          border: completedTasks['part-test'] ? '1px solid #86efac' : '1px solid #cbd5e1',
                          color: completedTasks['part-test'] ? '#15803d' : '#64748b',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          userSelect: 'none',
                          transition: 'all 0.15s ease'
                        }}
                        title={completedTasks['part-test'] ? 'Marcar com a pendent' : 'Marcar com a fet'}
                      >
                        <input
                          type="checkbox"
                          checked={!!completedTasks['part-test']}
                          onChange={() => toggleTask('part-test')}
                          style={{ cursor: 'pointer', accentColor: '#16a34a', width: '13px', height: '13px', margin: 0 }}
                        />
                        <span>{completedTasks['part-test'] ? 'Fet' : 'Fet?'}</span>
                      </label>
                    </div>
                  </div>
                  <h3 className="ent-eac2-part-title">
                    {completedTasks['part-test'] && <span style={{ color: '#16a34a', marginRight: '0.3rem' }}>✓</span>}
                    Test Desenvolupament
                  </h3>
                  <p className="ent-eac2-part-desc">10 preguntes oficials sobre conceptes, paradigmes i POO.</p>
                </div>
                <div style={{ marginTop: '0.8rem', fontSize: '0.78rem', color: completedTasks['part-test'] ? '#16a34a' : '#60a5fa', fontWeight: 800 }}>
                  {completedTasks['part-test'] ? '✅ Apartat 1 completat' : `Nota estimada: ${testStats.score} / 2.0 pts`}
                </div>
              </div>

              {/* ACTIVITAT 11 */}
              <div
                className={`ent-eac2-part-card ${activePartId === 'part-swing' ? 'active' : ''} ${completedTasks['part-swing'] ? 'completed' : ''}`}
                onClick={() => setActivePartId('part-swing')}
              >
                <div>
                  <div className="ent-eac2-part-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span className="ent-eac2-part-num">Activitat 11</span>
                      {completedTasks['part-swing'] && (
                        <span style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 800 }}>✓ Fet</span>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span className="ent-eac2-part-score">5.0 punts</span>
                      <label
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          cursor: 'pointer',
                          padding: '0.15rem 0.45rem',
                          borderRadius: '5px',
                          background: completedTasks['part-swing'] ? '#dcfce7' : '#f8fafc',
                          border: completedTasks['part-swing'] ? '1px solid #86efac' : '1px solid #cbd5e1',
                          color: completedTasks['part-swing'] ? '#15803d' : '#64748b',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          userSelect: 'none',
                          transition: 'all 0.15s ease'
                        }}
                        title={completedTasks['part-swing'] ? 'Marcar com a pendent' : 'Marcar com a fet'}
                      >
                        <input
                          type="checkbox"
                          checked={!!completedTasks['part-swing']}
                          onChange={() => toggleTask('part-swing')}
                          style={{ cursor: 'pointer', accentColor: '#16a34a', width: '13px', height: '13px', margin: 0 }}
                        />
                        <span>{completedTasks['part-swing'] ? 'Fet' : 'Fet?'}</span>
                      </label>
                    </div>
                  </div>
                  <h3 className="ent-eac2-part-title">
                    {completedTasks['part-swing'] && <span style={{ color: '#16a34a', marginRight: '0.3rem' }}>✓</span>}
                    Java Swing (Volei)
                  </h3>
                  <p className="ent-eac2-part-desc">WindowBuilder Pro, validacions de focus i càlculs de quota.</p>
                </div>
                <div style={{ marginTop: '0.8rem', fontSize: '0.78rem', color: completedTasks['part-swing'] ? '#16a34a' : '#38bdf8', fontWeight: 800 }}>
                  {completedTasks['part-swing'] ? '✅ Codi i exercici11.zip llestos' : 'Simulador & Codi font disponible'}
                </div>
              </div>

              {/* ACTIVITAT 12 */}
              <div
                className={`ent-eac2-part-card ${activePartId === 'part-spring' ? 'active' : ''} ${completedTasks['part-spring'] ? 'completed' : ''}`}
                onClick={() => setActivePartId('part-spring')}
              >
                <div>
                  <div className="ent-eac2-part-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span className="ent-eac2-part-num">Activitat 12</span>
                      {completedTasks['part-spring'] && (
                        <span style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 800 }}>✓ Fet</span>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span className="ent-eac2-part-score">2.0 punts</span>
                      <label
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          cursor: 'pointer',
                          padding: '0.15rem 0.45rem',
                          borderRadius: '5px',
                          background: completedTasks['part-spring'] ? '#dcfce7' : '#f8fafc',
                          border: completedTasks['part-spring'] ? '1px solid #86efac' : '1px solid #cbd5e1',
                          color: completedTasks['part-spring'] ? '#15803d' : '#64748b',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          userSelect: 'none',
                          transition: 'all 0.15s ease'
                        }}
                        title={completedTasks['part-spring'] ? 'Marcar com a pendent' : 'Marcar com a fet'}
                      >
                        <input
                          type="checkbox"
                          checked={!!completedTasks['part-spring']}
                          onChange={() => toggleTask('part-spring')}
                          style={{ cursor: 'pointer', accentColor: '#16a34a', width: '13px', height: '13px', margin: 0 }}
                        />
                        <span>{completedTasks['part-spring'] ? 'Fet' : 'Fet?'}</span>
                      </label>
                    </div>
                  </div>
                  <h3 className="ent-eac2-part-title">
                    {completedTasks['part-spring'] && <span style={{ color: '#16a34a', marginRight: '0.3rem' }}>✓</span>}
                    Spring Boot & Tomcat
                  </h3>
                  <p className="ent-eac2-part-desc">API REST web, càlcul del quàdruple (x4) i DNI de Blanca.</p>
                </div>
                <div style={{ marginTop: '0.8rem', fontSize: '0.78rem', color: completedTasks['part-spring'] ? '#16a34a' : '#34d399', fontWeight: 800 }}>
                  {completedTasks['part-spring'] ? '✅ Captura i exercici12.zip fets' : 'Captura exercici12.jpg & Codi'}
                </div>
              </div>

              {/* ACTIVITAT 13 */}
              <div
                className={`ent-eac2-part-card ${activePartId === 'part-copilot' ? 'active' : ''} ${completedTasks['part-copilot'] ? 'completed' : ''}`}
                onClick={() => setActivePartId('part-copilot')}
              >
                <div>
                  <div className="ent-eac2-part-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span className="ent-eac2-part-num">Activitat 13</span>
                      {completedTasks['part-copilot'] && (
                        <span style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 800 }}>✓ Fet</span>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span className="ent-eac2-part-score">1.0 punt</span>
                      <label
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          cursor: 'pointer',
                          padding: '0.15rem 0.45rem',
                          borderRadius: '5px',
                          background: completedTasks['part-copilot'] ? '#dcfce7' : '#f8fafc',
                          border: completedTasks['part-copilot'] ? '1px solid #86efac' : '1px solid #cbd5e1',
                          color: completedTasks['part-copilot'] ? '#15803d' : '#64748b',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          userSelect: 'none',
                          transition: 'all 0.15s ease'
                        }}
                        title={completedTasks['part-copilot'] ? 'Marcar com a pendent' : 'Marcar com a fet'}
                      >
                        <input
                          type="checkbox"
                          checked={!!completedTasks['part-copilot']}
                          onChange={() => toggleTask('part-copilot')}
                          style={{ cursor: 'pointer', accentColor: '#16a34a', width: '13px', height: '13px', margin: 0 }}
                        />
                        <span>{completedTasks['part-copilot'] ? 'Fet' : 'Fet?'}</span>
                      </label>
                    </div>
                  </div>
                  <h3 className="ent-eac2-part-title">
                    {completedTasks['part-copilot'] && <span style={{ color: '#16a34a', marginRight: '0.3rem' }}>✓</span>}
                    GitHub Copilot
                  </h3>
                  <p className="ent-eac2-part-desc">Eclipse Marketplace, mètodes de vocals i comptador de paraules.</p>
                </div>
                <div style={{ marginTop: '0.8rem', fontSize: '0.78rem', color: completedTasks['part-copilot'] ? '#16a34a' : '#a78bfa', fontWeight: 800 }}>
                  {completedTasks['part-copilot'] ? '✅ Reflexió i captura llesta' : 'Guia d\'ús & Respostes llestes'}
                </div>
              </div>
            </div>

            {/* SECCIÓ: APARTAT 1 (TEST) */}
            {activePartId === 'part-test' && (
              <div className="ent-task-card">
                <div className="ent-task-header">
                  <div>
                    <span className="ent-task-badge">Apartat 1</span>
                    <h2 style={{ display: 'inline', fontSize: '1.2rem', color: '#0f172a', fontWeight: 800 }}>
                      Desenvolupament de programari (10 Preguntes Tipus Test · 2.0 punts)
                    </h2>
                    <p style={{ margin: '0.5rem 0 0 0', color: '#64748b', fontSize: '0.85rem' }}>
                      Cada encert suma <strong>+0.20 punts</strong>. Cada errada resta <strong>-0.04 punts</strong>. Les preguntes en blanc no penalitzen.
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Nota aconseguida:</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#2563eb' }}>
                      {testStats.score} / 2.0
                    </div>
                  </div>
                </div>

                {/* Graella interactiva del test */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginTop: '1rem' }}>
                  {TEST_QUESTIONS.map((q) => {
                    const selected = testAnswers[q.num];
                    return (
                      <div
                        key={q.num}
                        style={{
                          background: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          padding: '1.1rem'
                        }}
                      >
                        <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a', marginBottom: '0.7rem' }}>
                          <span style={{ color: '#2563eb', marginRight: '0.4rem' }}>{q.num}.</span>
                          {q.question}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.45rem' }}>
                          {q.options.map((opt) => {
                            const isChosen = selected === opt.key;
                            let borderStyle = '1px solid #cbd5e1';
                            let bgStyle = '#ffffff';
                            let textColor = '#334155';
                            if (isChosen) {
                              if (opt.correct) {
                                borderStyle = '1px solid #10b981';
                                bgStyle = '#ecfdf5';
                                textColor = '#065f46';
                              } else {
                                borderStyle = '1px solid #ef4444';
                                bgStyle = '#fef2f2';
                                textColor = '#991b1b';
                              }
                            }
                            return (
                              <button
                                key={opt.key}
                                type="button"
                                onClick={() => handleAnswerSelect(q.num, opt.key)}
                                style={{
                                  textAlign: 'left',
                                  padding: '0.6rem 0.9rem',
                                  borderRadius: '6px',
                                  border: borderStyle,
                                  background: bgStyle,
                                  color: textColor,
                                  fontSize: '0.83rem',
                                  fontWeight: isChosen ? 700 : 500,
                                  cursor: 'pointer',
                                  transition: 'all 0.15s ease'
                                }}
                              >
                                <strong style={{ color: isChosen ? 'inherit' : '#2563eb', marginRight: '0.5rem' }}>[{opt.key.toUpperCase()}]</strong>
                                {opt.text}
                              </button>
                            );
                          })}
                        </div>
                        {selected && (
                          <div style={{ marginTop: '0.6rem', fontSize: '0.78rem', color: '#64748b', fontStyle: 'italic' }}>
                            💡 {q.justification}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* TAULA BLAVA DE RESPOSTES OFICIAL */}
                <div style={{ marginTop: '2rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                    📋 Graella de Respostes Oficial (per a enganxar al document .odt)
                  </h3>
                  <table className="ent-answers-table">
                    <thead>
                      <tr>
                        {TEST_QUESTIONS.map(q => <th key={q.num}>{q.num}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {TEST_QUESTIONS.map(q => {
                          const ans = testAnswers[q.num];
                          return (
                            <td key={q.num}>
                              {ans ? ans.toUpperCase() : '-'}
                            </td>
                          );
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SECCIÓ: ACTIVITAT 11 (JAVA SWING VOLEI) */}
            {activePartId === 'part-swing' && (
              <div>
                <div className="ent-task-card">
                  <div className="ent-task-header">
                    <div>
                      <span className="ent-task-badge">Activitat 11 · 5.0 punts</span>
                      <h2 style={{ display: 'inline', fontSize: '1.2rem', color: '#0f172a', fontWeight: 800 }}>
                        Simulador Quota Club de Volei (Java Swing & WindowBuilder Pro)
                      </h2>
                      <p style={{ margin: '0.5rem 0 0 0', color: '#64748b', fontSize: '0.85rem' }}>
                        Títol de la finestra amb el cognom de l'alumna: <code>"Simulador Quota Club Volei - deUna"</code>. Requeriment de components Swing purs (no SWT), tooltips a tots els camps editables, mètodes <code>requestFocus()</code> i <code>selectAll()</code> en cas d'error.
                      </p>
                    </div>
                  </div>

                  {/* RÈPLICA INTERACTIVA DE LA FINESTRA SWING */}
                  <h3 style={{ fontSize: '0.95rem', color: '#0284c7', fontWeight: 800, margin: '1rem 0 0.5rem 0' }}>
                    🎮 Prova en Viu: Rèplica Interactiva de la Interfície Swing
                  </h3>

                  <div className="swing-simulator-window">
                    <div className="swing-window-titlebar">
                      <span>Simulador Quota Club Volei - deUna</span>
                      <div className="swing-window-controls">
                        <span className="swing-control-btn" style={{ background: '#f59e0b' }}></span>
                        <span className="swing-control-btn" style={{ background: '#10b981' }}></span>
                        <span className="swing-control-btn" style={{ background: '#ef4444' }}></span>
                      </div>
                    </div>

                    <div className="swing-layout-grid">
                      {/* BLOC 1: DADES SOCI */}
                      <div className={`swing-box ${!swingState.isBloc1Enabled ? 'disabled' : ''}`}>
                        <div className="swing-box-title">Dades Soci</div>

                        <div className="swing-field-group">
                          <label>Edat del soci (6 - 99):</label>
                          <input
                            type="text"
                            title="Introduïu l'edat del soci (enter positiu entre 6 i 99 anys)."
                            className={`swing-input ${swingState.hasEdatError ? 'error' : ''}`}
                            placeholder="Ex: 24"
                            disabled={!swingState.isBloc1Enabled}
                            value={swingState.edat}
                            onChange={(e) => setSwingState({ ...swingState, edat: e.target.value })}
                          />
                        </div>

                        <div className="swing-field-group">
                          <label>Categoria / Nivell:</label>
                          <select
                            className="swing-input"
                            title="Seleccioneu la categoria del soci."
                            disabled={!swingState.isBloc1Enabled}
                            value={swingState.categoria}
                            onChange={(e) => setSwingState({ ...swingState, categoria: e.target.value })}
                          >
                            <option value="">-- Seleccioneu Categoria --</option>
                            <option value="Escolar">Escolar (250 €)</option>
                            <option value="Base">Base (400 €)</option>
                            <option value="Sènior">Sènior (500 €)</option>
                            <option value="Master">Master (600 €)</option>
                          </select>
                        </div>

                        <div className="swing-field-group">
                          <label>Tipus de Soci:</label>
                          <select
                            className="swing-input"
                            title="Seleccioneu el tipus de soci."
                            disabled={!swingState.isBloc1Enabled}
                            value={swingState.tipusSoci}
                            onChange={(e) => setSwingState({ ...swingState, tipusSoci: e.target.value })}
                          >
                            <option value="">-- Seleccioneu Tipus de Soci --</option>
                            <option value="Soci Jugador">Soci Jugador (100% preu)</option>
                            <option value="Soci Familiar">Soci Familiar (15% descompte)</option>
                            <option value="Soci Simpatitzant">Soci Simpatitzant (40% descompte)</option>
                          </select>
                        </div>

                        <button
                          type="button"
                          className="swing-action-btn swing-btn-primary"
                          style={{ width: '100%', marginTop: '0.4rem' }}
                          disabled={!swingState.isBloc1Enabled}
                          onClick={handleValidarSwing}
                        >
                          VALIDAR
                        </button>
                      </div>

                      {/* BLOC 2: OPCIONS I SERVEIS */}
                      <div className={`swing-box ${!swingState.isBloc2Enabled ? 'disabled' : ''}`}>
                        <div className="swing-box-title">Opcions i Serveis</div>

                        <div className="swing-field-group">
                          <label>Modalitat de joc:</label>
                          <select
                            className="swing-input"
                            title="Trieu la modalitat de joc desitjada."
                            disabled={!swingState.isBloc2Enabled}
                            value={swingState.modalitat}
                            onChange={(e) => setSwingState({ ...swingState, modalitat: e.target.value })}
                          >
                            <option value="">-- Seleccioneu Modalitat --</option>
                            <option value="Només Pista">Només Pista (+0 €)</option>
                            <option value="Només Volei Platja">Només Volei Platja (+0 €)</option>
                            <option value="Ambdós">Ambdós (Pista + Platja) (+120 €)</option>
                          </select>
                        </div>

                        <div className="swing-field-group">
                          <label>Equipació oficial completa:</label>
                          <select
                            className="swing-input"
                            title="Indiqueu si desitja adquirir l'equipació oficial (SÍ/NO)."
                            disabled={!swingState.isBloc2Enabled}
                            value={swingState.equipacio}
                            onChange={(e) => setSwingState({ ...swingState, equipacio: e.target.value })}
                          >
                            <option value="">-- Voleu Equipació? --</option>
                            <option value="SÍ">SÍ (+95 €)</option>
                            <option value="NO">NO (+0 €)</option>
                          </select>
                        </div>

                        <div className="swing-field-group">
                          <label>Aportació / Donació (€):</label>
                          <input
                            type="text"
                            title="Quantitat voluntària en euros (0 si no desitja donar)."
                            className={`swing-input ${swingState.hasDonacioError ? 'error' : ''}`}
                            disabled={!swingState.isBloc2Enabled}
                            value={swingState.donacio}
                            onChange={(e) => setSwingState({ ...swingState, donacio: e.target.value })}
                          />
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.4rem' }}>
                          <button
                            type="button"
                            className="swing-action-btn swing-btn-primary"
                            style={{ flex: 1 }}
                            disabled={!swingState.isBloc2Enabled}
                            onClick={handleCalcularSwing}
                          >
                            CALCULAR
                          </button>
                          <button
                            type="button"
                            className="swing-action-btn swing-btn-reset"
                            style={{ flex: 1 }}
                            disabled={!swingState.isBloc2Enabled}
                            onClick={handleEsborrarTotSwing}
                          >
                            ESBORRAR TOT
                          </button>
                        </div>
                      </div>

                      {/* BLOC 3: RESULTATS */}
                      <div className="swing-box">
                        <div className="swing-box-title">Resultats (No editables)</div>
                        <div className="swing-field-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <label style={{ margin: 0 }}>Preu Base (€):</label>
                          <input
                            type="text"
                            readOnly
                            className="swing-input"
                            style={{ width: '55%', textAlign: 'right', fontWeight: 700 }}
                            value={swingState.preuBase}
                          />
                        </div>
                        <div className="swing-field-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <label style={{ margin: 0 }}>IVA (21%) (€):</label>
                          <input
                            type="text"
                            readOnly
                            className="swing-input"
                            style={{ width: '55%', textAlign: 'right', fontWeight: 700 }}
                            value={swingState.iva}
                          />
                        </div>
                        <div className="swing-field-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <label style={{ margin: 0, fontWeight: 900, color: '#1e293b' }}>TOTAL (€):</label>
                          <input
                            type="text"
                            readOnly
                            className="swing-input"
                            style={{ width: '55%', textAlign: 'right', fontWeight: 900, color: '#2563eb', fontSize: '1rem' }}
                            value={swingState.total}
                          />
                        </div>
                      </div>

                      {/* BLOC 4: ERRORS I ALERTES */}
                      <div className="swing-box">
                        <div className="swing-box-title">Errors i Alertes</div>
                        <div className={`swing-alerts-panel ${swingState.alertaType === 'error' ? 'has-error' : swingState.alertaType === 'success' ? 'is-ok' : 'is-empty'}`}>
                          <span>{swingState.alertaType === 'error' ? '⚠️' : swingState.alertaType === 'success' ? '✓' : 'ℹ️'}</span>
                          <span>{swingState.alertaText || 'No hi ha cap alerta activa.'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CODI FONT JAVA SWING */}
                  <div style={{ marginTop: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <h3 style={{ fontSize: '1rem', color: '#0f172a', fontWeight: 800, margin: 0 }}>
                        💻 Codi Font Oficial per a Eclipse: <code>ClubVoleiFrame.java</code>
                      </h3>
                      <button
                        type="button"
                        className="ent-copy-btn"
                        onClick={() => handleCopy(JAVA_SWING_CODE, 'swing-code')}
                      >
                        {copiedKey === 'swing-code' ? '✓ Copiat al porta-retalls!' : 'Copiar Codi Java'}
                      </button>
                    </div>
                    <pre className="ent-code-block" style={{ maxHeight: '350px' }}>
                      {JAVA_SWING_CODE}
                    </pre>
                  </div>

                  {/* BOTONS DE DESCARGA DIRECTA */}
                  <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <a
                      href="/eacs/ent/EAC2/exercici11.zip"
                      download
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.65rem 1.2rem',
                        borderRadius: '8px',
                        background: '#2563eb',
                        color: '#ffffff',
                        textDecoration: 'none',
                        fontWeight: 800,
                        fontSize: '0.9rem',
                        boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)'
                      }}
                    >
                      📦 Descarregar exercici11.zip Llest per Lliurar
                    </a>
                    <a
                      href="/eacs/ent/EAC2/src/cat/ioc/volei/ClubVoleiFrame.java"
                      download
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.65rem 1.2rem',
                        borderRadius: '8px',
                        background: '#ffffff',
                        color: '#334155',
                        textDecoration: 'none',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        border: '1px solid #cbd5e1'
                      }}
                    >
                      📄 Descarregar ClubVoleiFrame.java
                    </a>
                    <button
                      type="button"
                      onClick={handleOpenFolder}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.65rem 1.2rem',
                        borderRadius: '8px',
                        background: '#f8fafc',
                        color: '#0f172a',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        border: '1px solid #cbd5e1',
                        cursor: 'pointer'
                      }}
                    >
                      📂 Obrir Carpeta de Resultats (Finder)
                    </button>
                  </div>

                  {/* GUIA PAS A PAS PER A ECLIPSE */}
                  <div style={{ marginTop: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.2rem' }}>
                    <h4 style={{ margin: '0 0 0.8rem 0', color: '#0f172a', fontSize: '0.98rem', fontWeight: 800 }}>
                      🛠️ Guia Pas a Pas per a Realitzar l'Exercici a Eclipse:
                    </h4>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      <details style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '7px', padding: '0.65rem 0.9rem' }}>
                        <summary style={{ cursor: 'pointer', fontWeight: 700, fontSize: '0.88rem', color: '#0f172a' }}>
                          <span style={{ color: '#2563eb', marginRight: '0.4rem' }}>Pas 1:</span> Crear el Projecte Java a Eclipse
                        </summary>
                        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.83rem', color: '#475569', lineHeight: 1.5 }}>
                          Ves al menú <code>File → New → Java Project</code>. Posa-li com a nom <code>Exercici11_Volei</code>. Utilitza Java SE 17 o 21 i <strong>desmarca</strong> la casella <em>Create module-info.java</em>.
                        </p>
                      </details>

                      <details style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '7px', padding: '0.65rem 0.9rem' }}>
                        <summary style={{ cursor: 'pointer', fontWeight: 700, fontSize: '0.88rem', color: '#0f172a' }}>
                          <span style={{ color: '#2563eb', marginRight: '0.4rem' }}>Pas 2:</span> Crear el JFrame amb WindowBuilder Pro
                        </summary>
                        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.83rem', color: '#475569', lineHeight: 1.5 }}>
                          Fes clic dret sobre la carpeta <code>src</code> → <code>New → Other...</code> → carpeta <code>WindowBuilder → Swing Designer → JFrame</code>. Posa com a Package <code>cat.ioc.volei</code> i com a Name <code>ClubVoleiFrame</code>.
                        </p>
                      </details>

                      <details style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '7px', padding: '0.65rem 0.9rem' }}>
                        <summary style={{ cursor: 'pointer', fontWeight: 700, fontSize: '0.88rem', color: '#0f172a' }}>
                          <span style={{ color: '#2563eb', marginRight: '0.4rem' }}>Pas 3:</span> Títol Obligatori amb el Cognom i Tooltips
                        </summary>
                        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.83rem', color: '#475569', lineHeight: 1.5 }}>
                          Al constructor de la finestra, estableix el títol oficial amb el teu cognom: <code>setTitle("Simulador Quota Club Volei - deUna");</code>. Afegeix <code>setToolTipText("...")</code> a tots els camps editables (edat, combos de selecció i aportació voluntària).
                        </p>
                      </details>

                      <details style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '7px', padding: '0.65rem 0.9rem' }}>
                        <summary style={{ cursor: 'pointer', fontWeight: 700, fontSize: '0.88rem', color: '#0f172a' }}>
                          <span style={{ color: '#2563eb', marginRight: '0.4rem' }}>Pas 4:</span> Validacions, Gestió de Focus i Fórmules de Càlcul
                        </summary>
                        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.83rem', color: '#475569', lineHeight: 1.5 }}>
                          En prémer <strong>VALIDAR</strong>: comprova enter positiu entre 6 i 99 anys i desplegables seleccionats. Si hi ha error, crida a <code>camp.requestFocus()</code> i <code>camp.selectAll()</code> per complir la rúbrica i mostra l'alerta. Si és correcte, deshabilita el bloc 1 i habilita el bloc 2.<br />
                          En prémer <strong>CALCULAR</strong>: calcula Quota Categoria × Factor Tipus Soci + Suplements (Ambdós +120€, Equipació +95€, Donació) + IVA 21%.
                        </p>
                      </details>

                      <details style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '7px', padding: '0.65rem 0.9rem' }}>
                        <summary style={{ cursor: 'pointer', fontWeight: 700, fontSize: '0.88rem', color: '#0f172a' }}>
                          <span style={{ color: '#2563eb', marginRight: '0.4rem' }}>Pas 5:</span> Proves i Generació del Fitxer exercici11.zip
                        </summary>
                        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.83rem', color: '#475569', lineHeight: 1.5 }}>
                          Executa la classe a Eclipse (<code>Run As → Java Application</code>). Comprova que calcula correctament i que el botó <em>ESBORRAR TOT</em> reinicialitza l'estat. Finalment, comprimeix la carpeta <code>src</code> en <code>exercici11.zip</code> (o fes servir el botó de descàrrega superior!).
                        </p>
                      </details>
                    </div>
                  </div>

                  {/* INSTRUCCIONS DE LLIURAMENT EXERCICI 11 */}
                  <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '1rem', marginTop: '1.2rem' }}>
                    <h4 style={{ margin: '0 0 0.4rem 0', color: '#1d4ed8', fontSize: '0.9rem' }}>
                      📦 Lliurament d'aquest exercici:
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: '#334155' }}>
                      Comprimiu la carpeta <code>src</code> del vostre projecte Eclipse en un fitxer anomenat <strong><code>exercici11.zip</code></strong> i afegiu-lo dins del zip general <code>DA2_M0487_EAC2_DeUna_M.zip</code>.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SECCIÓ: ACTIVITAT 12 (SPRING BOOT & TOMCAT) */}
            {activePartId === 'part-spring' && (
              <div className="ent-task-card">
                <div className="ent-task-header">
                  <div>
                    <span className="ent-task-badge">Activitat 12 · 2.0 punts</span>
                    <h2 style={{ display: 'inline', fontSize: '1.2rem', color: '#0f172a', fontWeight: 800 }}>
                      Aplicació Client-Servidor Spring a Tomcat (Quàdruple & DNI)
                    </h2>
                    <p style={{ margin: '0.5rem 0 0 0', color: '#64748b', fontSize: '0.85rem' }}>
                      Requeriments personals del professorat: calcular el <strong>quàdruple (x4)</strong> del valor introduït (en comptes del doble x2) i col·locar el <strong>DNI de Blanca</strong> a sota del títol i abans del resultat.
                    </p>
                  </div>
                </div>

                {/* Resolució de conflicte de port 8080 */}
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
                  <h4 style={{ margin: '0 0 0.4rem 0', color: '#b91c1c', fontSize: '0.9rem' }}>
                    ⚠️ Resolució d'incidència típica: Port 8080 ocupat
                  </h4>
                  <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.82rem', color: '#475569' }}>
                    Si en engegar Spring Boot apareix <em>"Web server failed to start. Port 8080 was already in use"</em>, executeu a la terminal:
                  </p>
                  <pre style={{ background: '#0f172a', padding: '0.6rem', borderRadius: '4px', fontSize: '0.8rem', color: '#38bdf8', margin: 0 }}>
                    sudo netstat -lnp | grep 8080   # identifica el PID (ex: 4199){'\n'}
                    sudo kill -9 4199               # finalitza el procés que ocupa el port
                  </pre>
                </div>

                {/* Codi del Controlador Spring */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <h3 style={{ fontSize: '1rem', color: '#0f172a', fontWeight: 800, margin: 0 }}>
                      💻 Codi Java: <code>com.exemple.web.servidor.Controlador.java</code>
                    </h3>
                    <button
                      type="button"
                      className="ent-copy-btn"
                      onClick={() => handleCopy(SPRING_CODE, 'spring-code')}
                    >
                      {copiedKey === 'spring-code' ? '✓ Copiat al porta-retalls!' : 'Copiar Codi Spring'}
                    </button>
                  </div>
                  <pre className="ent-code-block" style={{ maxHeight: '350px' }}>
                    {SPRING_CODE}
                  </pre>
                </div>

                {/* Mockup de la Captura Requerida */}
                <div style={{ marginTop: '1.5rem' }}>
                  <h3 style={{ fontSize: '0.95rem', color: '#34d399', fontWeight: 800, marginBottom: '0.6rem' }}>
                    📸 Previsualització de la Captura Oficial Requerida: <code>exercici12.jpg</code>
                  </h3>
                  <div style={{ background: '#ffffff', color: '#000000', padding: '1.5rem', borderRadius: '8px', border: '2px solid #cbd5e1', maxWidth: '600px' }}>
                    <h1 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem 0' }}>Calcula el quàdruple del valor</h1>
                    <p style={{ color: '#2563eb', fontWeight: 'bold', margin: '0 0 1rem 0' }}>
                      Alumna: Blanca de Uña Martín · DNI: 12345678Z (DNI fictici - Art. 5.1.c RGPD)
                    </p>
                    <h2 style={{ color: '#059669', fontSize: '1.3rem', margin: '0 0 0.5rem 0' }}>Resultat: 48</h2>
                    <p style={{ color: '#475569', fontSize: '0.9rem', margin: 0 }}>(Valor introduït: 12 &times; 4 = 48)</p>
                  </div>
                </div>

                {/* NOTA PENDENT PER A DEMÀ: CORREU A LA MONTSE (RGPD & DNI) */}
                <div style={{ 
                  background: 'linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)', 
                  border: '2px solid #3b82f6', 
                  borderRadius: '10px', 
                  padding: '1.2rem', 
                  marginTop: '1.5rem',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.08)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.2rem' }}>📬</span>
                      <h4 style={{ margin: 0, color: '#1e40af', fontSize: '0.98rem', fontWeight: 800 }}>
                        Pendent per a demà: Enviar correu a la Montse (DNI Fictici &amp; RGPD)
                      </h4>
                    </div>
                    <button
                      type="button"
                      className="ent-copy-btn"
                      onClick={() => handleCopy(`Assumpte: M0487 Entorns de Desenvolupament - Consulta sobre l'EAC 2 i protecció de dades (RGPD)

Bon dia, Montse,

Em poso en contacte amb tu en relació amb el desenvolupament de l'EAC 2 (Desenvolupament de programari), en la qual estic treballant actualment.

En abordar l'Activitat 12 (Spring Boot), on l'enunciat demana fer constar el DNI de l'alumnat a la pantalla web, t'informo que inclouré el meu nom complet però utilitzaré un DNI fictici estàndard (12345678Z).

D'acord amb el RGPD (Reglament UE 2016/679, Art. 5.1.c - Principi de minimització de dades) i la LOPDGDD 3/2018, la recollida i exposició d'una dada d'identificació personal com el DNI real dins d'exercicis avaluables, codi font o captures al Moodle no és legal ni procedent, atès que aquesta dada només pot ser tractada pels serveis de secretaria per a la formalització de la matrícula i la gestió d'expedients oficials. En l'àmbit docent i formatiu, la normativa exigeix l'ús exclusiu de dades fictícies o anonimitzades.

Si necessites contrastar aquest criteri o requereixes confirmació institucional sobre la improcedència de sol·licitar DNIs reals a les activitats d'avaluació contínua, pots consultar-ho directament amb el Delegat de Protecció de Dades de l'IOC mitjançant el seu correu oficial: dpd@ioc.cat.

D'aquesta manera, l'activitat acreditarà amb total claredat l'autoria del meu treball mantenint la privacitat protegida d'acord amb la legislació vigent.

Moltes gràcies per la teva atenció.

Cordialment,
Blanca de Uña Martín
Alumna de DAW - Institut Obert de Catalunya`, 'email-montse')}
                    >
                      {copiedKey === 'email-montse' ? '✓ Correu copiat!' : '📋 Copiar Borrador de Correu'}
                    </button>
                  </div>
                  
                  <p style={{ margin: '0 0 0.8rem 0', fontSize: '0.84rem', color: '#334155', lineHeight: 1.5 }}>
                    Recorda enviar aquest missatge des del correu del Moodle abans de fer el lliurament final perquè quedi constància oficial del teu criteri legal.
                  </p>

                  <div style={{ background: '#ffffff', border: '1px solid #bfdbfe', borderRadius: '6px', padding: '0.9rem', fontSize: '0.8rem', color: '#1e293b', whiteSpace: 'pre-wrap', lineHeight: 1.5, maxHeight: '200px', overflowY: 'auto' }}>
                    <strong>Assumpte:</strong> M0487 Entorns de Desenvolupament - Consulta sobre l'EAC 2 i protecció de dades (RGPD)
                    {'\n\n'}
                    Bon dia, Montse,
                    {'\n\n'}
                    Em poso en contacte amb tu en relació amb el desenvolupament de l'EAC 2 (Desenvolupament de programari), en la qual estic treballant actualment...
                    {'\n\n'}
                    En abordar l'Activitat 12 (Spring Boot), on l'enunciat demana fer constar el DNI de l'alumnat a la pantalla web, t'informo que inclouré el meu nom complet però utilitzaré un DNI fictici estàndard (12345678Z)...
                    {'\n\n'}
                    D'acord amb el RGPD (Art. 5.1.c) i la LOPDGDD 3/2018... delegat DPD oficial: dpd@ioc.cat.
                  </div>

                  <div style={{ marginTop: '0.8rem', display: 'flex', gap: '0.8rem' }}>
                    <a 
                      href="https://ioc.xtec.cat/campus/local/mail/view.php?t=drafts&c=18646&m=9380631"
                      target="_blank" 
                      rel="noreferrer"
                      style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '0.4rem', 
                        fontSize: '0.82rem', 
                        color: '#2563eb', 
                        fontWeight: 700, 
                        textDecoration: 'none' 
                      }}
                    >
                      🔗 Obrir la bústia de correu de la Montse al Moodle &rarr;
                    </a>
                  </div>
                </div>

                {/* INSTRUCCIONS DE LLIURAMENT EXERCICI 12 */}
                <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '8px', padding: '1rem', marginTop: '1.5rem' }}>
                  <h4 style={{ margin: '0 0 0.4rem 0', color: '#60a5fa', fontSize: '0.9rem' }}>
                    📦 Lliurament d'aquest exercici:
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1' }}>
                    Desa la captura com a <strong><code>exercici12.jpg</code></strong>. Comprimeix-la juntament amb la carpeta <code>src</code> del teu projecte Spring en un fitxer anomenat <strong><code>exercici12.zip</code></strong> i afegeix-lo al zip principal.
                  </p>
                </div>
              </div>
            )}

            {/* SECCIÓ: ACTIVITAT 13 (GITHUB COPILOT) */}
            {activePartId === 'part-copilot' && (
              <div className="ent-task-card">
                <div className="ent-task-header">
                  <div>
                    <span className="ent-task-badge">Activitat 13 · 1.0 punt</span>
                    <h2 style={{ display: 'inline', fontSize: '1.2rem', color: '#0f172a', fontWeight: 800 }}>
                      Assistent IA GitHub Copilot a Eclipse
                    </h2>
                    <p style={{ margin: '0.5rem 0 0 0', color: '#64748b', fontSize: '0.85rem' }}>
                      Instal·lació des d'Eclipse Marketplace, implementació de 2 mètodes estàtics (ocultació de vocals amb accents i comptador de paraules) i respostes de reflexió sobre l'assistent.
                    </p>
                  </div>
                </div>

                {/* Pas A: Instal·lació */}
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.1rem', marginBottom: '1.2rem' }}>
                  <h4 style={{ margin: '0 0 0.4rem 0', color: '#7c3aed', fontSize: '0.9rem' }}>
                    Pas A: Instal·lació a Eclipse Marketplace
                  </h4>
                  <ol style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', color: '#334155', lineHeight: '1.6' }}>
                    <li>Menú d'Eclipse: <code>Help → Eclipse Marketplace...</code></li>
                    <li>Cercar: <code>GitHub Copilot</code>, fer clic a <strong>Install</strong> i confirmar dependències i llicències.</li>
                    <li>Reiniciar Eclipse quan ho sol·liciti l'entorn.</li>
                    <li>A la vista <strong>Copilot Chat</strong>, iniciar sessió amb el compte de GitHub (el pla gratuït inclou fins a 2000 suggeriments al mes).</li>
                  </ol>
                </div>

                {/* Pas B: Codi de la classe amb els 2 mètodes */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <h3 style={{ fontSize: '1rem', color: '#0f172a', fontWeight: 800, margin: 0 }}>
                      💻 Codi Java: <code>cat.ioc.copilot.CopilotAssistent.java</code>
                    </h3>
                    <button
                      type="button"
                      className="ent-copy-btn"
                      onClick={() => handleCopy(COPILOT_JAVA_CODE, 'copilot-code')}
                    >
                      {copiedKey === 'copilot-code' ? '✓ Copiat al porta-retalls!' : 'Copiar Codi Copilot'}
                    </button>
                  </div>
                  <pre className="ent-code-block" style={{ maxHeight: '350px' }}>
                    {COPILOT_JAVA_CODE}
                  </pre>
                </div>

                {/* Respostes teòriques per a la memòria */}
                <div style={{ marginTop: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.3rem' }}>
                  <h3 style={{ fontSize: '1rem', color: '#0284c7', fontWeight: 800, margin: '0 0 0.8rem 0' }}>
                    📝 Respostes per a l'apartat 13 del document .odt:
                  </h3>
                  
                  <div style={{ marginBottom: '1rem' }}>
                    <strong style={{ color: '#0f172a', fontSize: '0.88rem' }}>1. Què heu escrit vosaltres i què ha suggerit Copilot?</strong>
                    <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.83rem', color: '#334155', lineHeight: '1.6' }}>
                      <em>Mètode 1 (Vocals):</em> He escrit la capçalera del mètode <code>public static String ocultarVocals(String text)</code> i el comentari explicant la substitució de vocals incloent les accentuades. Copilot ha suggerit automàticament l'expressió regular <code>text.replaceAll("(?i)[aeiouàèéíòóúïü]", "*")</code> i la comprovació prèvia de nuls.<br />
                      <em>Mètode 2 (Paraules):</em> He definit <code>public static int comptarParaules(String text)</code> i Copilot ha generat el control de text buit o nul amb <code>trim().isEmpty()</code> i la divisió per espais en blanc múltiples utilitzant <code>split("\\s+")</code> retornant la mida de l'array resultant.
                    </p>
                  </div>

                  <div>
                    <strong style={{ color: '#0f172a', fontSize: '0.88rem' }}>2. Trobeu que us ha estalviat feina? Ha estat fàcil utilitzar l'assistent?</strong>
                    <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.83rem', color: '#334155', lineHeight: '1.6' }}>
                      Sí, ha estalviat notablement el temps de desenvolupament, especialment en redactar d'un sol cop la regex exhaustiva de caràcters accentuats en català/castellà i en contemplar els casos límit (cadenes nul·les o amb espais repetits). La integració a Eclipse ha estat molt intuïtiva gràcies a la tecla Tab per acceptar suggeriments en línia i la barra lateral de xat.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* =================================================================
             MODE MEMÒRIA OFICIAL DE LLIURAMENT (OPCIÓ 2)
             ================================================================= */
          <div className="ent-paper-sheet">
            <div className="ent-paper-header">
              <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Institut Obert de Catalunya · CFGS Desenvolupament d'Aplicacions Web / Multiplataforma
              </div>
              <h1 style={{ margin: '0.4rem 0 0.2rem 0', fontSize: '1.7rem', color: '#0f172a' }}>
                Solució EAC 2: Desenvolupament de programari
              </h1>
              <div style={{ fontSize: '1rem', color: '#0284c7', fontWeight: 700 }}>
                Mòdul 0487 – Entorns de Desenvolupament · Curs 2026-27 (1r semestre)
              </div>
            </div>

            <table className="ent-paper-meta-table">
              <tbody>
                <tr>
                  <td className="label">Estudiant:</td>
                  <td><strong>Blanca de Uña Martín</strong></td>
                  <td className="label">Correu Oficial:</td>
                  <td>bdeunam@ioc.cat</td>
                </tr>
                <tr>
                  <td className="label">Nom Fitxer ODT:</td>
                  <td><code>DA2_M0487_EAC2_DeUna_M.odt</code></td>
                  <td className="label">Nom Fitxer ZIP:</td>
                  <td><code>DA2_M0487_EAC2_DeUna_M.zip</code></td>
                </tr>
                <tr>
                  <td className="label">Termini de Lliurament:</td>
                  <td colSpan="3">17 de novembre de 2026 a les 23:55 h</td>
                </tr>
              </tbody>
            </table>

            {/* SECCIÓ 1: TEST */}
            <h2 style={{ fontSize: '1.25rem', color: '#0369a1', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.4rem', marginTop: '2rem' }}>
              Apartat 1: Desenvolupament de programari (2 punts)
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#475569' }}>
              Taula de respostes corresponent a les 10 preguntes d'opció múltiple del material d'estudi:
            </p>

            <table className="ent-answers-table">
              <thead>
                <tr>
                  {TEST_QUESTIONS.map(q => <th key={q.num}>{q.num}</th>)}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {TEST_QUESTIONS.map(q => {
                    const ans = testAnswers[q.num];
                    return (
                      <td key={q.num}>
                        {ans ? ans.toUpperCase() : 'A'}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>

            {/* SECCIÓ 2: PREGUNTA 13 */}
            <h2 style={{ fontSize: '1.25rem', color: '#0369a1', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.4rem', marginTop: '2.5rem' }}>
              Apartat 2: Pregunta 13 (GitHub Copilot · 1 punt)
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#475569' }}>
              Captura de pantalla de la classe resultant <code>CopilotAssistent.java</code> amb els comentaris <code>/* */</code>:
            </p>

            <div className="ent-paper-box-screenshot">
              <div style={{ color: '#0284c7', fontSize: '1.6rem', marginBottom: '0.5rem' }}>🖼️</div>
              <div style={{ fontWeight: 700, color: '#334155' }}>
                [Espai reservat per a la Captura d'Eclipse amb la classe CopilotAssistent.java]
              </div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.3rem' }}>
                Mostrant els dos mètodes estàtics i els comentaris javadoc descriptius.
              </div>
            </div>

            <h3 style={{ fontSize: '1rem', color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
              Respostes a les qüestions:
            </h3>

            <div style={{ fontSize: '0.9rem', color: '#334155', lineHeight: '1.6' }}>
              <p>
                <strong>Per a cadascun dels mètodes: què heu escrit vosaltres i què ha suggerit CoPilot?</strong><br />
                A l'activitat he definit les capçaleres formals dels dos mètodes estàtics (<code>ocultarVocals</code> i <code>comptarParaules</code>) acompanyats d'un comentari en llenguatge natural explicant l'objectiu i els exemples de l'enunciat. A continuació, GitHub Copilot ha completat íntegrament els cossos dels mètodes: per al primer ha generat l'expressió regular <code>(?i)[aeiouàèéíòóúïü]</code> amb substitució per <code>"*"</code> i la validació de cadenes nul·les; per al segon, ha suggerit la neteja d'espais extrems amb <code>trim()</code>, la verificació de cadena buida i el particionat mitjançant <code>split("\\s+")</code>.
              </p>
              <p>
                <strong>Trobeu que us ha estalviat feina? Ha estat fàcil utilitzar l'assistent?</strong><br />
                Sí, l'estalvi de temps ha estat molt evident, sobretot en no haver d'escriure manualment el conjunt complet de caràcters accentuats catalans ni dissenyar la lògica de comprovació d'espais múltiples des de zero. La integració a través de l'Eclipse Marketplace és senzilla i el flux de treball resulta molt àgil acceptant suggeriments amb la tecla de tabulació.
              </p>
            </div>

            {/* SECCIÓ 3: CONTINGUT DEL FITXER ZIP FINAL */}
            <div style={{ marginTop: '2.5rem', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '1.2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '0.6rem' }}>
                <h4 style={{ margin: 0, color: '#0369a1', fontSize: '0.95rem' }}>
                  📁 Estructura del fitxer comprimit final: <code>DA2_M0487_EAC2_DeUna_M.zip</code>
                </h4>
                <button
                  type="button"
                  onClick={handleOpenFolder}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '6px',
                    border: '1px solid #93c5fd',
                    background: '#eff6ff',
                    color: '#1d4ed8',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  📂 Obrir Carpeta al Finder
                </button>
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.3rem', fontSize: '0.85rem', color: '#475569', lineHeight: '1.5' }}>
                <li><strong><code>DA2_M0487_EAC2_DeUna_M.odt</code></strong>: Aquest document amb el test i la pregunta 13 (sense enunciats innecessaris).</li>
                <li><strong><code>exercici11.zip</code></strong>: Carpeta <code>src</code> del projecte Swing WindowBuilder (quota de volei).</li>
                <li><strong><code>exercici12.zip</code></strong>: Carpeta <code>src</code> del projecte Spring Boot + captura <code>exercici12.jpg</code> (quàdruple i DNI).</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* TOAST FLOTANT DE CONFIRMACIÓ */}
      {folderToast && (
        <div className="ent-toast-notification">
          <span>{folderToast}</span>
          <button
            type="button"
            onClick={() => setFolderToast(null)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              fontSize: '1rem',
              padding: 0
            }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
