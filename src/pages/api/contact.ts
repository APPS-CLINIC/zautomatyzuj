export const POST = async ({ request }: { request: Request }) => {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.email || !body.message) {
      return new Response(
        JSON.stringify({ success: false, message: 'Email i wiadomość są wymagane' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (body.message.length < 10) {
      return new Response(
        JSON.stringify({ success: false, message: 'Wiadomość musi mieć co najmniej 10 znaków' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Log the contact submission
    console.log('📝 New contact submission:', {
      timestamp: new Date().toISOString(),
      data: body
    });

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Wiadomość została wysłana pomyślnie'
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('❌ Error processing contact form:', error);

    return new Response(
      JSON.stringify({
        success: false,
        message: 'Wystąpił błąd serwera podczas przetwarzania wiadomości'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};