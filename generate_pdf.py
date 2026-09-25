import os
import qrcode
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch

def generate_portfolio_pdf(pdf_path):
    # 1. Generate QR Code image for the portfolio URL
    portfolio_url = "https://omnia-ali-abdelmotleb.vercel.app/"
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=2,
    )
    qr.add_data(portfolio_url)
    qr.make(fit=True)
    qr_img = qr.make_image(fill_color="#0b0f19", back_color="white")
    qr_filename = "portfolio_qr.png"
    qr_img.save(qr_filename)

    # 2. Setup Page Document
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    story = []

    # Palette
    NAVY_DARK = colors.HexColor("#0b0f19")
    NAVY_CARD = colors.HexColor("#161e2e")
    GOLD = colors.HexColor("#f59e0b")
    CYAN = colors.HexColor("#06b6d4")
    TEXT_LIGHT = colors.HexColor("#f8fafc")
    TEXT_MUTED = colors.HexColor("#94a3b8")
    WHITE = colors.white

    # Custom Paragraph Styles
    styles = getSampleStyleSheet()

    header_name_style = ParagraphStyle(
        'HeaderName',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=26,
        leading=30,
        textColor=WHITE,
        spaceAfter=4
    )

    header_title_style = ParagraphStyle(
        'HeaderTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=GOLD,
        spaceAfter=8
    )

    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=CYAN,
        spaceBefore=12,
        spaceAfter=8
    )

    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10.5,
        leading=15,
        textColor=TEXT_LIGHT
    )

    muted_style = ParagraphStyle(
        'MutedText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13,
        textColor=TEXT_MUTED
    )

    url_link_style = ParagraphStyle(
        'URLLinkStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=CYAN
    )

    # --- HEADER BLOCK ---
    header_text = f"""
    <b><font size="24" color="#FFFFFF">Omnia Ali Abdelmotleb</font></b><br/>
    <font size="13" color="#f59e0b"><b>Data Analyst &amp; Software Engineer</b></font><br/>
    <font size="10" color="#94a3b8">Bachelor's in AI &amp; Data Science | Beni Suef National University</font>
    """
    
    qr_image = Image(qr_filename, width=1.1*inch, height=1.1*inch)

    header_table_data = [
        [Paragraph(header_text, body_style), qr_image]
    ]

    header_table = Table(header_table_data, colWidths=[4.8*inch, 1.6*inch])
    header_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), NAVY_DARK),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('PADDING', (0, 0), (-1, -1), 16),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 16),
        ('ALIGN', (1, 0), (1, 0), 'RIGHT'),
    ]))

    story.append(header_table)
    story.append(Spacer(1, 15))

    # --- PORTFOLIO LINK CARD ---
    link_html = f"""
    <font size="11" color="#94a3b8"><b>🌐 ONLINE PORTFOLIO URL:</b></font><br/><br/>
    <font size="14" color="#06b6d4"><b><a href="{portfolio_url}">{portfolio_url}</a></b></font><br/><br/>
    <font size="9.5" color="#cbd5e1">Scan the QR code above or click the link to visit the interactive portfolio website.</font>
    """

    link_card = Table([[Paragraph(link_html, body_style)]], colWidths=[6.4*inch])
    link_card.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), NAVY_CARD),
        ('PADDING', (0, 0), (-1, -1), 16),
        ('BOX', (0, 0), (-1, -1), 1.5, GOLD),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ]))

    story.append(link_card)
    story.append(Spacer(1, 15))

    # --- PROFILE SUMMARY ---
    story.append(Paragraph("<b>About Me &amp; Specialization</b>", section_heading))
    summary_text = """
    A dual-skilled professional specializing in Data Analysis, Artificial Intelligence, and Software Engineering. 
    Passionate about transforming complex datasets into actionable business insights and interactive data visualizations. 
    Experienced in Python, SQL, Power BI, Machine Learning models, Flutter mobile development, and full-stack web architectures.
    """
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 12))

    # --- KEY SKILLS & CONTACT TABLE ---
    col1_text = """
    <b><font color="#f59e0b">Core Technical Skills:</font></b><br/>
    • Data Analysis &amp; Visualization (Power BI, Excel)<br/>
    • Programming: Python, SQL, C#, C++, Dart<br/>
    • Web &amp; Mobile: ASP.NET Core, Flutter, HTML5/CSS3<br/>
    • AI &amp; ML: Machine Learning, Deep Learning, TensorFlow, NLP
    """

    col2_text = f"""
    <b><font color="#f59e0b">Contact Information:</font></b><br/>
    <b>Email:</b> <a href="mailto:oa741536@gmail.com"><font color="#06b6d4">oa741536@gmail.com</font></a><br/>
    <b>Phone:</b> <font color="#f8fafc">+20 11 11394981</font><br/>
    <b>Location:</b> <font color="#f8fafc">Cairo, Egypt</font><br/>
    <b>Portfolio:</b> <a href="{portfolio_url}"><font color="#06b6d4">omnia-ali-abdelmotleb.vercel.app</font></a>
    """

    info_table_data = [
        [Paragraph(col1_text, body_style), Paragraph(col2_text, body_style)]
    ]

    info_table = Table(info_table_data, colWidths=[3.2*inch, 3.2*inch])
    info_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), NAVY_CARD),
        ('PADDING', (0, 0), (-1, -1), 14),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]))

    story.append(info_table)
    story.append(Spacer(1, 20))

    # --- FOOTER ---
    story.append(HRFlowable(width="100%", thickness=1, color=NAVY_CARD, spaceBefore=10, spaceAfter=10))
    footer_text = f"""
    <font size="9" color="#94a3b8">© Omnia Ali Abdelmotleb • Interactive Portfolio PDF Card • <a href="{portfolio_url}"><font color="#06b6d4">{portfolio_url}</font></a></font>
    """
    story.append(Paragraph(footer_text, ParagraphStyle('Footer', parent=muted_style, alignment=1)))

    # Build Document
    doc.build(story)

    # Clean up QR temp file
    if os.path.exists(qr_filename):
        os.remove(qr_filename)

if __name__ == "__main__":
    out_pdf = "Omnia_Ali_Abdelmotleb_Portfolio.pdf"
    generate_portfolio_pdf(out_pdf)
    print(f"PDF successfully generated: {out_pdf}")
