import os
import qrcode
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch

def generate_minimal_portfolio_pdf(pdf_path):
    portfolio_url = "https://omnia-ali-abdelmotleb.vercel.app/"
    
    # 1. Generate QR Code image for the portfolio URL
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=12,
        border=2,
    )
    qr.add_data(portfolio_url)
    qr.make(fit=True)
    qr_img = qr.make_image(fill_color="#0b0f19", back_color="white")
    qr_filename = "portfolio_qr_minimal.png"
    qr_img.save(qr_filename)

    # 2. Setup Page Document (Minimal Card Format)
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        rightMargin=54,
        leftMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    story = []

    # Palette
    NAVY_DARK = colors.HexColor("#0b0f19")
    NAVY_CARD = colors.HexColor("#161e2e")
    GOLD = colors.HexColor("#f59e0b")
    CYAN = colors.HexColor("#06b6d4")
    TEXT_LIGHT = colors.HexColor("#f8fafc")
    TEXT_MUTED = colors.HexColor("#94a3b8")

    # Custom Styles
    styles = getSampleStyleSheet()

    name_style = ParagraphStyle(
        'NameStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=28,
        leading=34,
        alignment=1, # Centered
        textColor=TEXT_LIGHT,
        spaceAfter=6
    )

    subtitle_style = ParagraphStyle(
        'SubtitleStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        alignment=1, # Centered
        textColor=GOLD,
        spaceAfter=25
    )

    url_style = ParagraphStyle(
        'URLStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=20,
        alignment=1, # Centered
        textColor=CYAN
    )

    hint_style = ParagraphStyle(
        'HintStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10.5,
        leading=15,
        alignment=1, # Centered
        textColor=TEXT_MUTED,
        spaceBefore=10
    )

    story.append(Spacer(1, 40))

    # MAIN CONTAINER CARD
    card_contents = []

    # Header Name & Subtitle inside Card
    card_contents.append(Spacer(1, 15))
    card_contents.append(Paragraph("Omnia Ali Abdelmotleb", name_style))
    card_contents.append(Paragraph("Interactive Portfolio Card", subtitle_style))
    card_contents.append(HRFlowable(width="80%", thickness=1.5, color=GOLD, spaceBefore=0, spaceAfter=25))

    # Centered QR Code
    qr_image = Image(qr_filename, width=2.2*inch, height=2.2*inch)
    qr_table = Table([[qr_image]], colWidths=[6.0*inch])
    qr_table.setStyle(TableStyle([
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ]))
    card_contents.append(qr_table)
    card_contents.append(Spacer(1, 25))

    # Portfolio URL Link
    url_html = f'<b><a href="{portfolio_url}"><font color="#06b6d4">{portfolio_url}</font></a></b>'
    card_contents.append(Paragraph(url_html, url_style))
    card_contents.append(Paragraph("Scan the QR code with your mobile camera or click the link above to visit my portfolio.", hint_style))
    card_contents.append(Spacer(1, 20))

    # Outer Card Table
    card_table = Table([[item] for item in card_contents], colWidths=[6.5*inch])
    card_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), NAVY_CARD),
        ('BOX', (0, 0), (-1, -1), 2, GOLD),
        ('PADDING', (0, 0), (-1, -1), 20),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
    ]))

    story.append(card_table)

    # Build Document
    doc.build(story)

    # Clean up QR temp file
    if os.path.exists(qr_filename):
        os.remove(qr_filename)

if __name__ == "__main__":
    out_pdf = "Omnia_Ali_Abdelmotleb_Portfolio.pdf"
    generate_minimal_portfolio_pdf(out_pdf)
    print(f"Minimal PDF successfully generated: {out_pdf}")
